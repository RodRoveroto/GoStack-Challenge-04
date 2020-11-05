import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let incomeBalance = [0]
    let outcomeBalance = [0]

    this.transactions.forEach(transaction => {
      transaction.type === 'income'
        ? incomeBalance.push(transaction.value)
        : outcomeBalance.push(transaction.value)
    });

    const balance: Balance = {
      income: incomeBalance.reduce((newVal, total) => newVal + total),
      outcome: outcomeBalance.reduce((newVal, total) => newVal + total),
      total: incomeBalance.reduce((newVal, total) => newVal + total) -
        outcomeBalance.reduce((newVal, total) => newVal + total)
    }
    return balance
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value })
    this.transactions.push(transaction)
    return transaction

  }
}

export default TransactionsRepository;
