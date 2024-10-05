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

interface TransferFormProps {
  onTransfer: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [sourceAccount, setSourceAccount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [purpose, setPurpose] = useState('');
  const toast = useToast();

  const accounts = [...assetAccounts, ...liabilities];

  const handleCopy = () => {
    const date = new Date().toISOString().split('T')[0];
    const beancountFormat = `${date} * "${purpose || '轉帳'}"
  ${sourceAccount}  -${amount}
  ${targetAccount}`;

    navigator.clipboard.writeText(beancountFormat).then(() => {
      toast({
        title: '已複製到剪貼簿',
        description: 'Beancount 格式的轉帳資訊已成功複製。',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
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
        <Text mb={1}>轉帳用處：</Text>
        <Input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </Box>
      <Button colorScheme="teal" onClick={onTransfer}>
        執行轉帳
      </Button>
      <Button colorScheme="blue" onClick={handleCopy}>
        複製 Beancount 格式
      </Button>
    </VStack>
  );
};

export default TransferForm;
