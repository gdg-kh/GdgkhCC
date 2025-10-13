#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 檔案路徑
const STAFF_JSON = path.join(__dirname, 'data', 'staff.json');
const TEMPLATE_FILE = path.join(__dirname, 'staff-template.html');
const OUTPUT_DIR = path.join(__dirname, 'staff');

/**
 * 讀取工作人員資料
 */
function loadStaff() {
  try {
    const data = fs.readFileSync(STAFF_JSON, 'utf-8');
    const json = JSON.parse(data);
    return json.staff;
  } catch (error) {
    console.error('❌ 無法讀取工作人員資料:', error.message);
    process.exit(1);
  }
}

/**
 * 讀取模板檔案
 */
function loadTemplate() {
  try {
    return fs.readFileSync(TEMPLATE_FILE, 'utf-8');
  } catch (error) {
    console.error('❌ 無法讀取模板檔案:', error.message);
    process.exit(1);
  }
}

/**
 * 產生單一工作人員頁面
 */
function generateStaffPage(staff, template) {
  const staffId = staff.id;
  const staffDir = path.join(OUTPUT_DIR, staffId);

  // 建立工作人員資料夾
  if (!fs.existsSync(staffDir)) {
    fs.mkdirSync(staffDir, { recursive: true });
    console.log(`📁 建立資料夾: ${staffDir}`);
  }

  // 複製模板到工作人員資料夾
  const htmlPath = path.join(staffDir, 'index.html');
  fs.writeFileSync(htmlPath, template, 'utf-8');
  console.log(`✓ 產生頁面: staff/${staffId}/index.html`);

  // 提示需要手動添加 og-image.png
  const ogImagePath = path.join(staffDir, 'og-image.png');
  if (!fs.existsSync(ogImagePath)) {
    console.log(`  ⚠ 請手動添加: staff/${staffId}/og-image.png`);
  }
}

/**
 * 主函式
 */
function main() {
  console.log('🚀 開始產生工作人員頁面...\n');

  // 讀取資料
  const staff = loadStaff();
  const template = loadTemplate();

  console.log(`📊 找到 ${staff.length} 位工作人員\n`);

  // 確保輸出目錄存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 產生所有工作人員頁面
  let successCount = 0;
  staff.forEach((member) => {
    try {
      generateStaffPage(member, template);
      successCount++;
    } catch (error) {
      console.error(`❌ 產生 ${member.id} 頁面失敗:`, error.message);
    }
  });

  console.log(`\n✅ 完成！成功產生 ${successCount}/${staff.length} 個工作人員頁面`);
  console.log(`📁 輸出目錄: ${OUTPUT_DIR}`);
}

// 執行
main();
