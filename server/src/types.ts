export interface ExpenseCategory {
  name: string; // 例如: "Productivity"
  fullName: string; // 例如: "Expenses:Productivity"
  openDate: string; // 例如: "2020-01-01"
}

export interface SyncSession {
  id: string;
  pairingCode: string;
  createdAt: Date;
  lastSync?: Date;
}

export interface ClientMessage {
  type: 'PAIR' | 'SYNC_REQUEST';
  pairingCode?: string;
  lastSyncTime?: string;
}

export interface ServerMessage {
  type: 'PAIR_SUCCESS' | 'PAIR_ERROR' | 'SYNC_DATA';
  data?: ExpenseCategory[];
  error?: string;
}
