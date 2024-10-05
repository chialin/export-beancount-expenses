import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import { Expense } from '../types/expense';

interface ExpenseListProps {
  data: Expense[];
  onExport: () => void;
  onClear: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  data,
  onExport,
  onClear,
}) => {
  return (
    <Box mt={5}>
      <Flex justify="space-between" align="center">
        <Heading as="h2" size="md">
          今日花費
        </Heading>
        <Flex>
          <Button colorScheme="teal" mr={3} onClick={onExport}>
            複製
          </Button>
          <Button colorScheme="red" onClick={onClear}>
            清除 Storage
          </Button>
        </Flex>
      </Flex>

      <Box mt={4}>
        {data.length > 0 ? (
          data.map((entry: Expense, index) => (
            <Box key={index} mb={2}>
              <Text>{entry.date}</Text>
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
  );
};

export default ExpenseList;
