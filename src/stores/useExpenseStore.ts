import { create } from 'zustand';
import { ExpenseType } from '../types/ExpenseType';

interface ExpenseStore {
  expenses: ExpenseType[];
  addExpense: (expense: ExpenseType) => void;
  removeExpense: (index: number) => void;
  clearExpenses: () => void;
  getBeancountFormat: () => string;
}

const loadExpensesFromLocalStorage = (): ExpenseType[] => {
  if (typeof window === 'undefined') return [];
  const savedData = localStorage.getItem('expenses');
  return savedData ? JSON.parse(savedData) : [];
};

const saveExpensesToLocalStorage = (expenses: ExpenseType[]) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: loadExpensesFromLocalStorage(),
  addExpense: (expense) =>
    set((state) => {
      const updatedExpenses = [...state.expenses, expense];
      saveExpensesToLocalStorage(updatedExpenses);
      return { expenses: updatedExpenses };
    }),
  removeExpense: (index) =>
    set((state) => {
      const updatedExpenses = state.expenses.filter((_, i) => i !== index);
      saveExpensesToLocalStorage(updatedExpenses);
      return { expenses: updatedExpenses };
    }),
  clearExpenses: () => {
    saveExpensesToLocalStorage([]);
    set(() => {
      return { expenses: [] };
    });
  },
  getBeancountFormat: () => {
    const { expenses } = get();
    const beancountExport = expenses
      .map((entry) => {
        const purpose = entry.purpose ? `;${entry.purpose}` : '';
        // 使用 toLocaleString 添加千位分隔符，並保持兩位小數
        const formattedAmount = (-entry.amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        let result = `${entry.date} * "${entry.expenseName}"
    ${entry.account}  ${formattedAmount} TWD
    ${entry.expenseType}`;

        if (purpose) {
          result += `\n  ${purpose}`;
        }

        return result;
      })
      .join('\n\n');

    return beancountExport;
  },
}));
