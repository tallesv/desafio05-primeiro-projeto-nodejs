import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (previousValue, transaction) =>
        transaction.type === 'income'
          ? previousValue + transaction.value
          : 0 + previousValue,
      0,
    );
    const outcome = this.transactions.reduce(
      (previousValue, transaction) =>
        transaction.type === 'outcome'
          ? previousValue + transaction.value
          : 0 + previousValue,
      0,
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionTDO): Transaction {
    if (type === 'income' || type === 'outcome') {
      const transaction = new Transaction({ title, value, type });
      this.transactions.push(transaction);
      return transaction;
    }
    throw Error('invalid type.');
  }
}

export default TransactionsRepository;
