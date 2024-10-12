import {
  Select,
  Input,
  Box,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  Icon,
  SimpleGrid,
  Divider,
  AbsoluteCenter,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegCreditCard } from 'react-icons/fa';
import { liabilities } from '../constants/liabilities';
import { formatNumberWithCommas } from '../utils/formatNumber';

interface CreditCardInfo {
  creditLimit: string;
  currentSpending: string;
}

const CreditCardSettings: React.FC = () => {
  const [creditLimit, setCreditLimit] = useState('');
  const [currentSpending, setCurrentSpending] = useState('0');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [liabilitySettings, setLiabilitySettings] = useState<{
    [key: string]: CreditCardInfo;
  }>(() => JSON.parse(localStorage.getItem('liabilitySettings') || '{}'));

  const handleSave = () => {
    const newCreditCardInfo: CreditCardInfo = {
      creditLimit,
      currentSpending,
    };
    const updatedLiabilitySettings = {
      ...liabilitySettings,
      [selectedAccount]: newCreditCardInfo,
    };
    setLiabilitySettings(updatedLiabilitySettings);
    localStorage.setItem(
      'liabilitySettings',
      JSON.stringify(updatedLiabilitySettings)
    );
  };

  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading as="h2" size="md">
            信用卡設定
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
        <Text mb={1}>設定信用卡花費額度</Text>
        <Input
          placeholder="設定信用卡花費額度"
          value={creditLimit}
          onChange={(e) => setCreditLimit(e.target.value)}
        />
      </Box>
      <Box mb={4}>
        <Text mb={1}>初始花費</Text>
        <Input
          placeholder="初始花費"
          value={currentSpending}
          onChange={(e) => setCurrentSpending(e.target.value)}
        />
      </Box>
      <Button colorScheme="teal" onClick={handleSave}>
        新增
      </Button>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading as="h2" size="md">
            信用卡資訊
          </Heading>
        </AbsoluteCenter>
      </Box>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {Object.entries(liabilitySettings).map(([account, info]) => (
          <Card key={account} width="250px">
            <CardHeader>
              {/* <Flex align="center" gap={2}> */}
              <Icon as={FaRegCreditCard} boxSize={6} />
              <Text fontWeight="bold">{account.split(':').pop()}</Text>
              {/* </Flex> */}
            </CardHeader>
            <CardBody>
              <Text>
                <strong>信用卡花費額度:</strong>{' '}
                {formatNumberWithCommas(info.creditLimit)} TWD
              </Text>
              <Text>
                <strong>目前的花費:</strong>{' '}
                {formatNumberWithCommas(info.currentSpending)} TWD
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CreditCardSettings;
