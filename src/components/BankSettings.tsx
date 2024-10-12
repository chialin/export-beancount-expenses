import {
  Select,
  Input,
  Box,
  Button,
  Text,
  Divider,
  AbsoluteCenter,
  Heading,
} from '@chakra-ui/react';
import { liabilities } from '../constants/liabilities';
import { useState } from 'react';

const BankSettings: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleBankSave = () => {};

  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading as="h2" size="md">
            銀行帳號設定
          </Heading>
        </AbsoluteCenter>
      </Box>
      <Box mb={4}>
        <Select
          placeholder="選擇帳號"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {liabilities.map((acc, index) => (
            <option key={index} value={acc}>
              {acc}
            </option>
          ))}
        </Select>
      </Box>
      <Box mb={4}>
        <Text mb={1}>初始化金額</Text>
        <Input
          placeholder="初始化金額"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
        />
      </Box>
      <Button colorScheme="teal" onClick={handleBankSave}>
        儲存銀行設定
      </Button>
    </>
  );
};

export default BankSettings;
