#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 檔案路徑
const COMMUNITY_JSON = path.join(__dirname, 'data', 'community.json');
const TEMPLATE_FILE = path.join(__dirname, 'community-template.html');
const OUTPUT_DIR = path.join(__dirname, 'community');

/**
 * 讀取社群資料
 */
function loadCommunity() {
  try {
    const data = fs.readFileSync(COMMUNITY_JSON, 'utf-8');
    const json = JSON.parse(data);
    return json.community;
  } catch (error) {
    console.error('❌ 無法讀取社群資料:', error.message);
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
 * 產生單一社群頁面
 */
function generateCommunityPage(community, template) {
  const communityId = community.id;
  const communityDir = path.join(OUTPUT_DIR, communityId);

  // 建立社群資料夾
  if (!fs.existsSync(communityDir)) {
    fs.mkdirSync(communityDir, { recursive: true });
    console.log(`📁 建立資料夾: ${communityDir}`);
  }

  // 複製模板到社群資料夾
  const htmlPath = path.join(communityDir, 'index.html');
  fs.writeFileSync(htmlPath, template, 'utf-8');
  console.log(`✓ 產生頁面: community/${communityId}/index.html`);

  // 提示需要手動添加 og-image.png
  const ogImagePath = path.join(communityDir, 'og-image.png');
  if (!fs.existsSync(ogImagePath)) {
    console.log(`  ⚠ 請手動添加: community/${communityId}/og-image.png`);
  }
}

/**
 * 主函式
 */
function main() {
  console.log('🚀 開始產生社群頁面...\n');

  // 讀取資料
  const community = loadCommunity();
  const template = loadTemplate();

  console.log(`📊 找到 ${community.length} 個社群\n`);

  // 確保輸出目錄存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 產生所有社群頁面
  let successCount = 0;
  community.forEach((comm) => {
    try {
      generateCommunityPage(comm, template);
      successCount++;
    } catch (error) {
      console.error(`❌ 產生 ${comm.id} 頁面失敗:`, error.message);
    }
  });

  console.log(`\n✅ 完成！成功產生 ${successCount}/${community.length} 個社群頁面`);
  console.log(`📁 輸出目錄: ${OUTPUT_DIR}`);
}

// 執行
main();
