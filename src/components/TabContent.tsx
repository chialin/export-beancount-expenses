import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import TransferForm from './TransferForm';
import CreditCardSettings from './CreditCardSettings';
import BankSettings from './BankSettings';

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
  const [tabIndex, setTabIndex] = useState(0);

  const handleTransfer = (transaction: string) => {
    onTransfer(transaction);
  };

  const handleMenuItemClick = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        index={tabIndex}
        onChange={setTabIndex}
      >
        <TabList>
          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
            />
            <MenuList>
              <MenuItem onClick={() => handleMenuItemClick(2)}>
                消費明細
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(3)}>
                信用卡設定
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(4)}>
                銀行帳號設定
              </MenuItem>
            </MenuList>
          </Menu>
          <Tab ml={2}>每日花費</Tab>
          <Tab>轉帳功能</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ExpenseForm onAddExpense={onAddExpense} />
          </TabPanel>
          <TabPanel>
            <TransferForm onTransfer={handleTransfer} />
          </TabPanel>
          <TabPanel>
            <ExpenseList data={data} onExport={onExport} onClear={onClear} />
          </TabPanel>
          <TabPanel>
            <CreditCardSettings />
          </TabPanel>
          <TabPanel>
            <BankSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TabContent;
