import { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import TabContent from './components/TabContent';
import { Expense } from './types/expense';
import {
  handleAddExpense,
  clearStorage,
  exportToday,
  handleTransfer,
} from './utils/expenseUtils';

const App = () => {
  const [data, setData] = useState<Expense[]>([]);
  const toast = useToast();

  // 讀取 localStorage 資料
  useEffect(() => {
    const savedData = localStorage.getItem('expenses');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleClickAddExpense = (newExpense: Expense) => {
    try {
      handleAddExpense(newExpense, data, setData);
      toast({
        title: '新增資料成功！',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `新增失敗-${error}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <TabContent
        data={data}
        onAddExpense={handleClickAddExpense}
        onExport={() => exportToday(data, toast)}
        onClear={() => clearStorage(setData)}
        onTransfer={() => handleTransfer(toast)}
      />
    </Box>
  );
};

export default App;
