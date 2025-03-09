import { v4 as uuidv4 } from 'uuid';
import { WebSocket } from 'ws';
import { ExpensesCategoryParser } from './expenses-category-parser';
import {
  SyncSession,
  ClientMessage,
  ServerMessage,
  ExpenseCategory,
} from './types';

export class SyncManager {
  private sessions: Map<string, SyncSession>;
  private connections: Map<string, WebSocket>;
  private parser: ExpensesCategoryParser;
  private categories: ExpenseCategory[] = [];

  constructor(beancountFilePath: string) {
    this.sessions = new Map();
    this.connections = new Map();
    this.parser = new ExpensesCategoryParser(beancountFilePath);
    this.initializeCategories();
  }

  private async initializeCategories() {
    try {
      this.categories = await this.parser.parseExpenseCategories();
      this.startFileWatcher();
    } catch (error) {
      console.error('初始化支出類別失敗:', error);
    }
  }

  private async startFileWatcher() {
    await this.parser.watchExpenseCategories((categories) => {
      this.categories = categories;
      this.broadcastUpdate();
    });
  }

  private broadcastUpdate() {
    const message: ServerMessage = {
      type: 'SYNC_DATA',
      data: this.categories,
    };

    this.connections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }

  generatePairingCode(): string {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const session: SyncSession = {
      id: uuidv4(),
      pairingCode: code,
      createdAt: new Date(),
    };
    this.sessions.set(code, session);

    // 5分鐘後刪除配對碼
    setTimeout(() => {
      this.sessions.delete(code);
    }, 5 * 60 * 1000);

    return code;
  }

  async handleConnection(ws: WebSocket) {
    const sessionId = uuidv4();

    ws.on('message', async (data: string) => {
      try {
        const message: ClientMessage = JSON.parse(data);

        switch (message.type) {
          case 'PAIR':
            if (message.pairingCode) {
              const session = this.sessions.get(message.pairingCode);
              if (session) {
                this.connections.set(sessionId, ws);
                const response: ServerMessage = { type: 'PAIR_SUCCESS' };
                ws.send(JSON.stringify(response));

                // 配對成功後立即發送支出類別資料
                this.broadcastUpdate();
              } else {
                const response: ServerMessage = {
                  type: 'PAIR_ERROR',
                  error: '無效的配對碼',
                };
                ws.send(JSON.stringify(response));
              }
            }
            break;

          case 'SYNC_REQUEST':
            if (this.connections.has(sessionId)) {
              this.broadcastUpdate();
            }
            break;
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    ws.on('close', () => {
      this.connections.delete(sessionId);
    });
  }

  getCategories(): ExpenseCategory[] {
    return this.categories;
  }
}
