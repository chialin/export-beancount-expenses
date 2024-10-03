import { useEffect, useState } from 'react';
import { assetAccounts } from './constants/assetAccounts'; // 資產帳號
import { expenses } from './constants/expenses'; // 解析出的花費資料
import { Expense } from './types/expense';
import formatDate from './libs/formatDate';
import styles from './styles/ExpenseManager.module.css';

function App() {
  const [data, setData] = useState<Expense[]>([]);
  const [date, setDate] = useState(formatDate(new Date()));
  const [account, setAccount] = useState(assetAccounts[0]);
  const [expenseType, setExpenseType] = useState(expenses[0]);
  const [amount, setAmount] = useState(0);

  // 讀取 localStorage 資料
  useEffect(() => {
    const savedData = localStorage.getItem('expenses');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // 新增花費並存入 localStorage
  const addExpense = () => {
    const newExpense: Expense = {
      date,
      account,
      expenseType,
      amount,
    };

    const updatedData = [...data, newExpense];
    setData(updatedData);
    localStorage.setItem('expenses', JSON.stringify(updatedData)); // 儲存至 localStorage
  };

  // 清除 localStorage 資料
  const clearStorage = () => {
    localStorage.removeItem('expenses'); // 清除 localStorage 中的資料
    setData([]); // 清空當前應用狀態
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

      <h2>今日花費</h2>
      <div className={styles.btnGroup}>
        <button
          onClick={exportToday}
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          匯出今日花費
        </button>
        <button
          onClick={clearStorage}
          className={`${styles.btn} ${styles.btnClean}`}
        >
          清除 Storage
        </button>
      </div>
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
