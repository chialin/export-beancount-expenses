import { useState } from 'react';
import { Input, Select, Button, Box, Text, VStack } from '@chakra-ui/react';
import { assetAccounts } from '../constants/assetAccounts';
import { liabilities } from '../constants/liabilities';

interface TransferFormProps {
  onTransfer: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onTransfer }) => {
  const [sourceAccount, setSourceAccount] = useState(assetAccounts[0]);
  const [targetAccount, setTargetAccount] = useState(assetAccounts[1]);
  const [amount, setAmount] = useState(0);

  const accounts = [...assetAccounts, ...liabilities];

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text mb={1}>來源帳號：</Text>
        <Select
          value={sourceAccount}
          onChange={(e) => setSourceAccount(e.target.value)}
        >
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
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Box>
      <Button colorScheme="teal" onClick={onTransfer}>
        執行轉帳
      </Button>
    </VStack>
  );
};

export default TransferForm;
