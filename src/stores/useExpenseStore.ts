import { create } from 'zustand';
import { Expense } from '../types/Expense';

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (index: number) => void;
  clearExpenses: () => void;
  getBeancountFormat: () => string;
}

const loadExpensesFromLocalStorage = (): Expense[] => {
  if (typeof window === 'undefined') return [];
  const savedData = localStorage.getItem('expenses');
  return savedData ? JSON.parse(savedData) : [];
};

const saveExpensesToLocalStorage = (expenses: Expense[]) => {
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
        return `${entry.date} * "${entry.expenseName}"
  ${entry.account}  ${(-entry.amount).toFixed(2)} TWD
  ${entry.expenseType}
  ${purpose}`;
      })
      .join('\n\n');
    return beancountExport;
  },
}));
