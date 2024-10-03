import { useEffect, useState } from 'react';
import { assetAccounts } from './constants/assetAccounts'; // 資產帳號
import { expenses } from './constants/expenses'; // 解析出的花費資料
import { Expense } from './types/expense';

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
    <div>
      <h1>每日花費管理</h1>
      <button onClick={exportToday}>Export Today</button>

      <h2>新增花費</h2>
      <div>
        <label>日期：</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>帳號：</label>
        <select value={account} onChange={(e) => setAccount(e.target.value)}>
          {assetAccounts.map((acc, index) => (
            <option key={index} value={acc}>
              {acc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>花費類型：</label>
        <select
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
        >
          {expenses.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>金額：</label>
        <input
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button onClick={addExpense}>新增花費</button>

      <h2>今日花費</h2>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>帳號</th>
            <th>花費類型</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((entry: Expense, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.account}</td>
                <td>{entry.expenseType}</td>
                <td>{entry.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
