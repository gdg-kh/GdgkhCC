const translations = {
    "en": {
        "title": "SantaCode 2025",
        "subtitle": "> Programmer's Secret Santa Event initialized...",
        "mission_title": "🎯 The Mission",
        "mission_desc_1": "Welcome to the Programmer's Secret Santa!",
        "mission_desc_2": "Your mission is to write a program that prints a **Christmas tree** to the screen.",
        "mission_desc_3": "After the event, the system will swap code snippets. You will receive a tree planted by a secret santa in your terminal!",
        "rules_title": "⚠️ System Constraints",
        "rules_desc": "To ensure safety, we strictly enforce:",
        "rule_1": "<strong>No Internet</strong>: Offline environment.",
        "rule_2": "<strong>Std Lib Only</strong>: No third-party packages.",
        "rule_3": "<strong>Timeout</strong>: Max 5 seconds execution.",
        "rule_4": "<strong>Output</strong>: Print to stdout.",
        "rule_5": "<strong>ID Match</strong>: Folder name must match your GitHub ID.",
        "join_title": "🚀 How to Join",
        "step_1_title": "Fork Repo",
        "step_1_desc": "Fork this project to your GitHub.",
        "step_2_title": "Create Directory",
        "step_2_desc": "Create a folder `submissions/YOUR_ID/`.",
        "step_3_title": "Write Code",
        "step_3_desc": "Place your code (e.g., `tree.py`).",
        "step_4_title": "Pull Request",
        "step_4_desc": "Submit PR. Wait for Green Check ✅.",
        "runtimes_title": "💾 Supported Runtimes",
        "footer_status": "Status: WAITING_FOR_SUBMISSIONS"
    },
    "zh-TW": {
        "title": "SantaCode 2025",
        "subtitle": "> 工程師的交換禮物活動初始化中...",
        "mission_title": "🎯 任務目標",
        "mission_desc_1": "歡迎來到工程師專屬的交換禮物活動！",
        "mission_desc_2": "你的任務是寫一個程式，執行後在螢幕上印出一棵 **聖誕樹**。",
        "mission_desc_3": "活動結束後，系統會亂數配對。你會收到某個神秘人寫的程式，在你的終端機裡種下一棵樹！",
        "rules_title": "⚠️ 系統限制 (規則)",
        "rules_desc": "為了安全，我們嚴格執行以下限制：",
        "rule_1": "<strong>無網路</strong>: 執行環境完全斷網。",
        "rule_2": "<strong>限標準庫</strong>: 禁止第三方套件 (No pip/npm install)。",
        "rule_3": "<strong>執行限時</strong>: 必須在 5 秒內跑完。",
        "rule_4": "<strong>標準輸出</strong>: 請將結果印在 stdout。",
        "rule_5": "<strong>一人一交</strong>: 資料夾名稱必須與 GitHub ID 完全一致。",
        "join_title": "🚀 如何參加",
        "step_1_title": "Fork 專案",
        "step_1_desc": "將本專案 Fork 到你的 GitHub。",
        "step_2_title": "建立目錄",
        "step_2_desc": "建立資料夾 `submissions/你的ID/`。",
        "step_3_title": "撰寫程式",
        "step_3_desc": "放入你的程式碼 (如 `tree.py`)。",
        "step_4_title": "提交 PR",
        "step_4_desc": "發送 Pull Request 等待綠勾勾 ✅。",
        "runtimes_title": "💾 支援語言環境",
        "footer_status": "狀態: 等待投稿中"
    },
    "ja": {
        "title": "SantaCode 2025",
        "subtitle": "> プログラマーのシークレットサンタ、起動中...",
        "mission_title": "🎯 ミッション",
        "mission_desc_1": "プログラマーのためのプレゼント交換へようこそ！",
        "mission_desc_2": "あなたの任務は、実行すると画面に **クリスマスツリー** を表示するプログラムを書くことです。",
        "mission_desc_3": "イベント終了後、システムがランダムにコードを交換します。あなたのターミナルに誰かのツリーが植えられます！",
        "rules_title": "⚠️ システム制約 (ルール)",
        "rules_desc": "安全のため、以下の制限を厳守してください：",
        "rule_1": "<strong>オフライン</strong>: 実行環境はネット接続なし。",
        "rule_2": "<strong>標準ライブラリのみ</strong>: 外部パッケージ禁止。",
        "rule_3": "<strong>タイムアウト</strong>: 実行時間は5秒以内。",
        "rule_4": "<strong>出力</strong>: 結果は標準出力 (stdout) へ。",
        "rule_5": "<strong>一人一回</strong>: フォルダ名はGitHub IDと一致必須。",
        "join_title": "🚀 参加方法",
        "step_1_title": "リポジトリをFork",
        "step_1_desc": "このプロジェクトを自分のGitHubにForkします。",
        "step_2_title": "フォルダ作成",
        "step_2_desc": "`submissions/あなたのID/` フォルダを作成。",
        "step_3_title": "コード作成",
        "step_3_desc": "プログラムを配置 (例: `tree.py`)。",
        "step_4_title": "プルリクエスト",
        "step_4_desc": "PRを送信し、緑のチェック ✅ を待つ。",
        "runtimes_title": "💾 対応ランタイム",
        "footer_status": "ステータス: 投稿待ち"
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update buttons state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    let defaultLang = 'en';
    
    // Check localStorage first
    const savedLang = localStorage.getItem('santacode_lang');
    
    if (savedLang) {
        defaultLang = savedLang;
    } else {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage; 
        const langCode = browserLang.toLowerCase().split('-')[0]; // Get 'zh', 'ja', 'en'
        
        if (langCode === 'zh') {
            defaultLang = 'zh-TW';
        } else if (langCode === 'ja') {
            defaultLang = 'ja';
        }
    }

    setLanguage(defaultLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.target.dataset.lang;
            setLanguage(selectedLang);
            // Only save when user explicitly clicks
            localStorage.setItem('santacode_lang', selectedLang);
        });
    });
});
