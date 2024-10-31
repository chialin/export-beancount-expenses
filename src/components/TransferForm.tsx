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
import { Expense } from '../types/Expense';
import { useExpenseStore } from '../stores/useExpenseStore';

const TRANSFER_FEE = 'Expenses:TransferFee';
const TransferForm = () => {
  const { addExpense } = useExpenseStore();
  const [sourceAccount, setSourceAccount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [purpose, setPurpose] = useState('');
  const [fee, setFee] = useState<number | string>('');
  const toast = useToast();

  const accounts = [...assetAccounts, ...liabilities];

  const handleTransfer = () => {
    if (!sourceAccount || !targetAccount || amount === '') {
      toast({
        title: '新增轉帳資料失敗',
        description: '請確保所有欄位都已正確填寫，且金額不為 0。',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const date = new Date().toISOString().split('T')[0];
    const newExpense: Expense = {
      expenseName: purpose || '轉帳',
      date: date,
      account: sourceAccount,
      expenseType: TRANSFER_FEE,
      amount: Number(amount),
      purpose,
    };
    addExpense(newExpense);
    toast({
      title: '新增轉帳資訊成功',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb={1}>來源帳號：</Text>
        <Select
          value={sourceAccount}
          onChange={(e) => setSourceAccount(e.target.value)}
        >
          <option value="" disabled hidden>
            選擇來源帳號
          </option>
          {accounts.map((acc, index) => (
            <option key={index} value={acc}>
              {acc}
            </option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text mb={1}>目標帳號：</Text>
        <Select
          value={targetAccount}
          onChange={(e) => setTargetAccount(e.target.value)}
        >
          <option value="" disabled hidden>
            選擇目標帳號
          </option>
          {accounts.map((acc, index) => (
            <option key={index} value={acc}>
              {acc}
            </option>
          ))}
        </Select>
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
        <Text mb={1}>手續費：</Text>
        <Input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1}>轉帳用處：</Text>
        <Input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </Box>
      <Button colorScheme="teal" onClick={handleTransfer}>
        新增轉帳
      </Button>
    </VStack>
  );
};

export default TransferForm;
