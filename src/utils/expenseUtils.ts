import { Expense } from '../types/expense';

export const handleAddExpense = (
  newExpense: Expense,
  data: Expense[],
  setData: (data: Expense[]) => void
) => {
  const updatedData = [...data, newExpense];
  setData(updatedData);
  localStorage.setItem('expenses', JSON.stringify(updatedData)); // 儲存至 localStorage
};

export const clearStorage = (setData: (data: Expense[]) => void) => {
  localStorage.removeItem('expenses');
  setData([]);
};

export const exportToday = (
  data: Expense[],
  toast: (options: {
    title: string;
    status: 'success' | 'error';
    duration: number;
    isClosable: boolean;
  }) => void
) => {
  const beancountExport = data
    .map((entry) => {
      return `${entry.date} * "${entry.expenseName}"
${entry.account}  ${(-entry.amount).toFixed(2)} TWD
${entry.expenseType}`;
    })
    .join('\n\n');

  navigator.clipboard
    .writeText(beancountExport)
    .then(() => {
      toast({
        title: 'Beancount 資料已成功複製到剪貼簿！',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: '複製失敗',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error('複製失敗', err);
    });
};

export const handleTransfer = (
  toast: (options: {
    title: string;
    status: 'info';
    duration: number;
    isClosable: boolean;
  }) => void
) => {
  toast({
    title: '新增轉帳資訊成功',
    status: 'info',
    duration: 2000,
    isClosable: true,
  });
};
