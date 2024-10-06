import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import TransferForm from './TransferForm';
import { Expense } from '../types/expense';
import { useState } from 'react';

interface TabContentProps {
  data: Expense[];
  onAddExpense: (newExpense: Expense) => void;
  onExport: () => void;
  onClear: () => void;
  onTransfer: (transaction: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  data,
  onAddExpense,
  onExport,
  onClear,
  onTransfer,
}) => {
  // const [transactions, setTransactions] = useState<string[]>([]);

  const handleTransfer = (transaction: string) => {
    onTransfer(transaction);
  };

  return (
    <Tabs variant="enclosed" colorScheme="teal">
      <TabList>
        <Tab>每日花費</Tab>
        <Tab>轉帳功能</Tab>
        <Tab>今日交易明細</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ExpenseForm onAddExpense={onAddExpense} />
          <ExpenseList data={data} onExport={onExport} onClear={onClear} />
        </TabPanel>
        <TabPanel>
          <TransferForm onTransfer={handleTransfer} />
        </TabPanel>
        <TabPanel>
          <ExpenseList data={data} onExport={onExport} onClear={onClear} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabContent;
