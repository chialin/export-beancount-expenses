import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Divider,
  AbsoluteCenter,
  useToast,
} from '@chakra-ui/react';
import { Expense } from '../types/Expense';
import { useExpenseStore } from '../stores/useExpenseStore';
import { copyToClipboard } from '../utils/clipboard';

const ExpenseList = () => {
  const { expenses, getBeancountFormat, clearExpenses } = useExpenseStore();
  const toast = useToast();

  const handleExport = () => {
    const text = getBeancountFormat();
    copyToClipboard({ text, toast });
  };

  return (
    <Box>
      <Box mt={5}>
        <Flex justify="space-between" align="center">
          <Flex>
            <Button colorScheme="teal" mr={3} onClick={handleExport}>
              複製 Beancount 格式
            </Button>
            <Button colorScheme="red" onClick={clearExpenses}>
              清除 Storage
            </Button>
          </Flex>
        </Flex>
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            <Heading as="h2" size="md">
              消費明細
            </Heading>
          </AbsoluteCenter>
        </Box>
        <Box mt={4}>
          {expenses.length > 0 ? (
            expenses.map((entry: Expense, index) => (
              <Box
                key={index}
                mb={2}
                p={4}
                bg={index % 2 === 0 ? 'gray.100' : 'white'}
                borderRadius="md"
                boxShadow="sm"
              >
                <Text>{entry.date}</Text>
                <Divider orientation="horizontal" />
                <Text>{entry.expenseName}</Text>
                <Flex justify="space-between">
                  <Text>{entry.account}</Text>
                  <Text>{`-${entry.amount.toFixed(2)}`}</Text>
                </Flex>
                <Text>{entry.expenseType}</Text>
              </Box>
            ))
          ) : (
            <Text>目前沒有花費紀錄。</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseList;
