import { useState } from 'react';
import {
  Input,
  Select,
  Button,
  Box,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { assetAccounts } from '../constants/assetAccounts';
import { liabilities } from '../constants/liabilities';
import { expenses } from '../constants/expenses';
import { Expense } from '../types/Expense';
import { useExpenseStore } from '../stores/useExpenseStore';

const ExpenseForm = () => {
  const { addExpense } = useExpenseStore();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [account, setAccount] = useState(assetAccounts[0]);
  const [expenseType, setExpenseType] = useState(expenses[0]);
  const [amount, setAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [purpose, setPurpose] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    if (amount === '') {
      toast({
        title: '新增資料失敗',
        description: '請確保所有欄位都已正確填寫，且金額不為 0。',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newExpense: Expense = {
      expenseName,
      date,
      account,
      expenseType,
      amount: Number(amount),
      purpose,
    };

    addExpense(newExpense);
    toast({
      title: '新增花費成功',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    setExpenseName(''); // 清空表單
    setAmount(''); // 重置金額
  };

  const accounts = [...assetAccounts, ...liabilities];

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb={1}>日期：</Text>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1}>花費項目：</Text>
        <Input
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1}>金額：</Text>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1}>帳號：</Text>
        <Select value={account} onChange={(e) => setAccount(e.target.value)}>
          {accounts.map((acc, index) => (
            <option key={index} value={acc}>
              {acc}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text mb={1}>花費類型：</Text>
        <Select
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
        >
          {expenses.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text mb={1}>目的：</Text>
        <Input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      </Box>
      <Button colorScheme="teal" onClick={handleSubmit}>
        新增花費
      </Button>
    </VStack>
  );
};

export default ExpenseForm;
