import subprocess
import sys
import os
import logging
from pathlib import Path

# 設定 Log
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# 支援的語言設定
LANGUAGE_CONFIG = {
    '.py': {
        'image': 'python:3.10-slim',
        'command': 'python',
        'file_flag': '' 
    },
    '.js': {
        'image': 'node:18-alpine',
        'command': 'node',
        'file_flag': ''
    },
    '.go': {
        'image': 'golang:1.20-alpine',
        'command': 'go run',
        'file_flag': ''
    },
    '.rb': {
        'image': 'ruby:3.2-alpine',
        'command': 'ruby',
        'file_flag': ''
    },
    '.sh': {
        'image': 'alpine:3.18',
        'command': 'sh',
        'file_flag': ''
    },
    '.java': {
        'image': 'openjdk:17-jdk-slim',
        'command': 'java', 
        'file_flag': ''
    },
    '.kt': {
        'image': 'zenika/kotlin:1.8',
        'command': 'kotlinc -script',
        'file_flag': ''
    },
    '.swift': {
        'image': 'swift:5.8-slim',
        'command': 'swift',
        'file_flag': ''
    },
    '.c': {
        'image': 'gcc:12',
        'command': 'sh -c "gcc $0 -o /tmp/app && /tmp/app"',
        'file_flag': ''
    },
    '.cpp': {
        'image': 'gcc:12',
        'command': 'sh -c "g++ $0 -o /tmp/app && /tmp/app"',
        'file_flag': ''
    },
    '.cs': {
        'image': 'mono:6.12',
        'command': 'sh -c "mcs $0 -out:/tmp/app.exe && mono /tmp/app.exe"',
        'file_flag': ''
    },
    '.rs': {
        'image': 'rust:slim',
        'command': 'sh -c "rustc $0 -o /tmp/app && /tmp/app"',
        'file_flag': ''
    }
}

# 安全限制
TIMEOUT_SEC = 10  # Increased for compiled languages
MEMORY_LIMIT = "512m"
CPU_LIMIT = "0.5"

def detect_language(file_path: Path):
    ext = file_path.suffix
    if ext not in LANGUAGE_CONFIG:
        return None
    return LANGUAGE_CONFIG[ext]

def run_in_docker(file_path: str):
    path = Path(file_path).resolve()
    if not path.exists():
        return False, "File not found"

    config = detect_language(path)
    if not config:
        return False, f"Unsupported file extension: {path.suffix}"

    # 準備掛載路徑
    host_dir = str(path.parent)
    filename = path.name
    
    # 組合 Docker 指令
    # 對於需要 Shell 解析的指令 (如 C/C++/C#)，我們需要微調呼叫方式
    cmd_list = config['command'].split()
    
    # 如果 command 包含 sh -c，我們需要正確處理參數
    if cmd_list[0] == 'sh' and '-c' in cmd_list:
        # 將 filename 替換進去指令字串中 (簡單替換 $0)
        # 注意：這是一個簡單的實作，實際專案可能需要更嚴謹的參數傳遞
        script = cmd_list[2].replace('$0', filename)
        final_cmd = ['sh', '-c', script]
    else:
        final_cmd = [*cmd_list, filename]

    docker_cmd = [
        "docker", "run", "--rm",
        "--network", "none",
        "--memory", MEMORY_LIMIT,
        "--cpus", CPU_LIMIT,
        "--read-only",
        "--tmpfs", "/tmp:exec",        # 允許 /tmp 寫入且可執行 (編譯產物需要)
        "-v", f"{host_dir}:/app:ro",
        "-w", "/app",
        config['image'],
        *final_cmd
    ]

    try:
        logger.info(f"Executing {filename} with image {config['image']}...")
        result = subprocess.run(
            docker_cmd,
            capture_output=True,
            text=True,
            timeout=TIMEOUT_SEC
        )
        
        if result.returncode != 0:
            return False, f"Runtime Error (Exit Code {result.returncode}):\n{result.stderr}"
            
        return True, result.stdout

    except subprocess.TimeoutExpired:
        return False, f"Timeout! Execution exceeded {TIMEOUT_SEC} seconds."
    except Exception as e:
        return False, f"System Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python runner.py <path_to_submission_file>")
        sys.exit(1)

    target_file = sys.argv[1]
    success, output = run_in_docker(target_file)
    
    print("--- EXECUTION RESULT ---")
    if success:
        print("STATUS: SUCCESS")
        print("OUTPUT:")
        print(output)
    else:
        print("STATUS: FAILED")
        print("ERROR:")
        print(output)
        sys.exit(1)
