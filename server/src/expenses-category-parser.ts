import { ExpenseCategory } from './types';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export class ExpensesCategoryParser {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async parseExpenseCategories(): Promise<ExpenseCategory[]> {
    const categories: ExpenseCategory[] = [];
    const fileStream = createReadStream(this.filePath);
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const trimmedLine = line.trim();

      // 跳過空行和註釋
      if (!trimmedLine || trimmedLine.startsWith(';')) {
        continue;
      }

      // 解析 open 指令
      const match = trimmedLine.match(
        /^(\d{4}-\d{2}-\d{2})\s+open\s+(Expenses:[A-Za-z:]+)/
      );
      if (match) {
        const [, date, fullName] = match;
        const name = fullName.split(':').pop() || '';

        categories.push({
          name,
          fullName,
          openDate: date,
        });
      }
    }

    return categories;
  }

  async watchExpenseCategories(
    callback: (categories: ExpenseCategory[]) => void
  ) {
    try {
      const watcher = fs.watch(this.filePath);
      for await (const event of watcher) {
        if (event.eventType === 'change') {
          const categories = await this.parseExpenseCategories();
          callback(categories);
        }
      }
    } catch (error) {
      console.error('Error watching file:', error);
    }
  }
}
