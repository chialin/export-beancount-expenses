export interface ExpenseType {
  expenseName: string;
  date: string; // 日期使用字串格式 'YYYY-MM-DD'
  account: string; // 帳戶名稱或帳號
  expenseType: string; // 花費的類型
  amount: number; // 花費金額
  purpose: string;
}
