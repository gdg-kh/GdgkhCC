import sys

def validate_tree(output_text):
    """
    簡單檢查 Output 是否像一棵樹
    1. 不可以是空的
    2. 必須包含常見的樹葉符號 (*, ^, #, @)
    3. 形狀應該要是三角形? (太難判定，先略過)
    """
    if not output_text or not output_text.strip():
        return False, "Output is empty!"
        
    tree_symbols = ['*', '^', '#', '@', '+', 'o', 'A']
    lines = output_text.strip().split('\n')
    
    # 檢查行數，樹通常不會只有一行
    if len(lines) < 3:
        return False, "Tree is too short (less than 3 lines)"

    # 檢查是否有樹葉符號
    has_leaves = any(char in output_text for char in tree_symbols)
    if not has_leaves:
        return False, "Doesn't look like a tree (no *, ^, #, @ symbols found)"
        
    return True, "Looks like a valid tree!"

if __name__ == "__main__":
    # 從 stdin 讀取 output
    content = sys.stdin.read()
    valid, message = validate_tree(content)
    
    if valid:
        print(f"PASS: {message}")
        sys.exit(0)
    else:
        print(f"FAIL: {message}")
        sys.exit(1)

