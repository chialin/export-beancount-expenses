import { Box, Image, Link, Text } from '@chakra-ui/react';
import TabContent from './components/TabContent';

const App = () => {
  return (
    <Box p={5}>
      <Box
        display="flex"
        alignItems="center"
        mb={4}
        bg="teal.100"
        p={3}
        borderRadius="md"
      >
        <Link href="/landing.html">
          <Image
            src="/beancount.svg"
            alt="Beancount Logo"
            boxSize="40px"
            mr={3}
          />
        </Link>
        <Text fontSize="xl" fontWeight="bold">
          Beancount Expenses
        </Text>
      </Box>
      <TabContent />
    </Box>
  );
};

export default App;
