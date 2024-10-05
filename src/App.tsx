import { useEffect, useState } from 'react';
import { assetAccounts } from './constants/assetAccounts'; // 資產帳號
import { liabilities } from './constants/liabilities';

import { expenses } from './constants/expenses';
import { Expense } from './types/expense';
import formatDate from './libs/formatDate';

import styles from './styles/ExpenseManager.module.css';
import './App.css';

function App() {
  const [data, setData] = useState<Expense[]>([]);
  const [date, setDate] = useState(formatDate(new Date()));
  const [account, setAccount] = useState(assetAccounts[0]);
  const [expenseType, setExpenseType] = useState(expenses[0]);
  const [amount, setAmount] = useState(0);
  const [expenseName, setExpenseName] = useState('');

  // 讀取 localStorage 資料
  useEffect(() => {
    const savedData = localStorage.getItem('expenses');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // 新增花費並存入 localStorage
  const addExpense = () => {
    if (amount === 0) {
      return;
    }
    const newExpense: Expense = {
      expenseName,
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

  // 將資料匯出成 Beancount 格式
  const exportToday = () => {
    const beancountExport = data
      .map((entry) => {
        return `${entry.date} * "${entry.expenseName}"
  ${entry.account}  ${(-entry.amount).toFixed(2)} TWD
  ${entry.expenseType}`;
      })
      .join('\n\n'); // 用換行符號分隔每一筆交易

    // 複製到剪貼簿
    navigator.clipboard
      .writeText(beancountExport)
      .then(() => {
        alert('Beancount 資料已成功複製到剪貼簿！');
      })
      .catch((err) => {
        console.error('複製失敗', err);
      });
  };

  const accounts = [...assetAccounts, ...liabilities];

  return (
    <div className={styles.container}>
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
        <label className="col-12">花費項目：</label>
        <div className="col-12">
          <input
            type="text"
            onChange={(e) => setExpenseName(e.target.value)}
            className={styles.formControl}
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
            {accounts.map((acc, index) => (
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

      <div className={styles.expenseHeader}>
        <h2>今日花費</h2>
        <div className={styles.btnGroup}>
          <button
            onClick={exportToday}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            複製
          </button>
          <button
            onClick={clearStorage}
            className={`${styles.btn} ${styles.btnClean}`}
          >
            清除 Storage
          </button>
        </div>
      </div>

      <div className={styles.expenseList}>
        {data &&
          data.map((entry: Expense, index) => (
            <div key={index} className={`${styles.expenseItem} row`}>
              <span className={styles.date}>{entry.date}</span>
              <span className={styles.date}>{entry.expenseName}</span>
              <div className={styles.row}>
                <div className={styles.transaction}>
                  <span className={styles.account}>{entry.account}</span>
                  <span className={styles.money}>{`-${entry.amount.toFixed(
                    2
                  )}`}</span>
                </div>

                <span className={styles.expenseType}>{entry.expenseType}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
