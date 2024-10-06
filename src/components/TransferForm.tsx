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
const TRANSFER_FEE = 'Expenses:TransferFee';
const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [sourceAccount, setSourceAccount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [purpose, setPurpose] = useState('');
  const [fee, setFee] = useState<number | string>('');
  const toast = useToast();

  const accounts = [...assetAccounts, ...liabilities];

  const formatAmount = (value: number | string) => {
    return parseFloat(value as string).toFixed(2);
  };

  const handleCopy = () => {
    const date = new Date().toISOString().split('T')[0];
    const formattedAmount = formatAmount(amount);
    const formattedFee = fee ? formatAmount(fee) : '';
    const beancountFormat = `${date} * "${purpose || '轉帳'}"
  ${sourceAccount}  -${formattedAmount}
  ${targetAccount}  ${formattedAmount}
  ${fee ? `${TRANSFER_FEE}  -${formattedFee}` : ''}`;

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
          onChange={(e) => setAmount(parseFloat(e.target.value).toFixed(2))}
        />
      </Box>
      <Box>
        <Text mb={1}>手續費：</Text>
        <Input
          type="number"
          value={fee}
          onChange={(e) => setFee(parseFloat(e.target.value).toFixed(2))}
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
