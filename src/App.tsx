import { useEffect, useState } from 'react';
import { assetAccounts } from './constants/assetAccounts'; // 資產帳號
import { expenses } from './constants/expenses'; // 解析出的花費資料
import { Expense } from './types/expense';
import styles from './styles/ExpenseManager.module.css';

function App() {
  const [data, setData] = useState<Expense[]>([]);
  const [date, setDate] = useState('');
  const [account, setAccount] = useState(assetAccounts[0]);
  const [expenseType, setExpenseType] = useState(expenses[0]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // 取得 YYYY-MM-DD 格式
    setDate(today);
  }, []);

  // 新增花費的函式
  const addExpense = () => {
    const newExpense: Expense = {
      date,
      account,
      expenseType,
      amount,
    };
    setData([...data, newExpense]);
  };

  // 匯出今日花費的函式
  const exportToday = () => {};

  return (
    <div className="container">
      <h1>每日花費紀錄</h1>

      <h2>新增花費</h2>
      <div className="row mb-3">
        <label className="col-12">日期：</label>
        <div className="col-12">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${styles.formControl} form-control`}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12">帳號：</label>
        <div className="col-12">
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className={`${styles.formControl} form-select`}
          >
            {assetAccounts.map((acc, index) => (
              <option key={index} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12">花費類型：</label>
        <div className="col-12">
          <select
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
            className={`${styles.formControl} form-select`}
          >
            {expenses.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-12">金額：</label>
        <div className="col-12">
          <input
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            className={`${styles.formControl} form-control`}
          />
        </div>
      </div>
      <button
        onClick={addExpense}
        className={`${styles.btn} ${styles.btnPrimary}`}
      >
        新增花費
      </button>
      <button
        onClick={exportToday}
        className={`${styles.btn} ${styles.btnPrimary}`}
      >
        匯出今日花費
      </button>
      <h2>今日花費</h2>
      <div className={styles.expenseList}>
        {data &&
          data.map((entry: Expense, index) => (
            <div key={index} className={`${styles.expenseItem} row`}>
              <span className={styles.date}>{entry.date}</span>
              <div className={styles.row}>
                <span className={styles.account}>{entry.account}</span>
                <span className={styles.expenseType}>{entry.expenseType}</span>
              </div>
              <span className={styles.money}>{entry.amount}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
