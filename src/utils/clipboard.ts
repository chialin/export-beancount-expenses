import { UseToastOptions } from '@chakra-ui/react';
export interface CopyToClipboardParams {
  text: string;
  toast: (options: UseToastOptions) => void;
}

export const copyToClipboard = ({ text, toast }: CopyToClipboardParams) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast({
        title: 'Beancount 資料已成功複製到剪貼簿！',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: '複製失敗',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error('複製失敗', err);
    });
};
