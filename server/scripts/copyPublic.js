const fs = require('fs');
const path = require('path');

// 創建目標目錄
const targetDir = path.join(__dirname, '../dist/public');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 複製文件
const sourceFile = path.join(__dirname, '../src/public/index.html');
const targetFile = path.join(targetDir, 'index.html');

fs.copyFileSync(sourceFile, targetFile);
console.log('靜態文件已複製到 dist/public 目錄');
