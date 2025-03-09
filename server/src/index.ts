import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { SyncManager } from './sync-manager';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { tmpdir } from 'os';

const app = express();
const port = process.env.PORT || 3001;

let syncManager: SyncManager | null = null;
let currentFilePath: string | null = null;

// 設定檔案上傳
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(tmpdir(), 'beancount-sync');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `beancount-${Date.now()}.bean`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 主頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動服務的 API
app.post('/api/start', upload.single('beancountFile'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('請提供檔案');
    }

    const filePath = req.file.path;

    // 如果已經有運行中的服務，先停止它
    if (syncManager) {
      // TODO: 實作停止現有服務的邏輯
      if (currentFilePath && fs.existsSync(currentFilePath)) {
        try {
          fs.unlinkSync(currentFilePath);
        } catch (error) {
          console.error('清理舊檔案失敗:', error);
        }
      }
    }

    // 建立新的同步管理器
    syncManager = new SyncManager(filePath);
    currentFilePath = filePath;

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : '未知錯誤',
    });
  }
});

// 取得配對碼的 API
app.get('/api/pair', (req, res) => {
  if (!syncManager) {
    res.status(400).json({
      success: false,
      error: '服務尚未啟動',
    });
    return;
  }

  const pairingCode = syncManager.generatePairingCode();
  res.json({ pairingCode });
});

// 取得目前狀態的 API
app.get('/api/status', (req, res) => {
  res.json({
    isRunning: !!syncManager,
    currentFile: currentFilePath,
  });
});

// 取得支出類別的 API
app.get('/api/categories', (req, res) => {
  if (!syncManager) {
    res.status(400).json({
      success: false,
      error: '服務尚未啟動',
    });
    return;
  }

  res.json(syncManager.getCategories());
});

// 啟動 HTTP 伺服器
const server = app.listen(port, () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
  console.log('請開啟瀏覽器訪問上述地址來設定服務');
});

// 設定 WebSocket 伺服器
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  if (!syncManager) {
    ws.close();
    return;
  }

  console.log('新的 WebSocket 連接');
  syncManager.handleConnection(ws);
});

// 清理函數
process.on('SIGINT', () => {
  if (currentFilePath && fs.existsSync(currentFilePath)) {
    try {
      fs.unlinkSync(currentFilePath);
    } catch (error) {
      console.error('清理檔案失敗:', error);
    }
  }
  process.exit();
});
