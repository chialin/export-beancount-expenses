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

  return (
    <Box p={5}>
      <TabContent
        data={data}
        onAddExpense={(newExpense: Expense) =>
          handleAddExpense(newExpense, data, setData)
        }
        onExport={() => exportToday(data, toast)}
        onClear={() => clearStorage(setData)}
        onTransfer={() => handleTransfer(toast)}
      />
    </Box>
  );
};

export default App;
