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
    let balance: {
      incomeBalance: number[]
      outcomeBalance: number[]
      total: number
    } = {
      incomeBalance: [0],
      outcomeBalance: [0],
      total: 0
    }
    this.transactions.forEach(transaction => {
      transaction.type === 'income'
        ? balance.incomeBalance.push(transaction.value)
        : balance.outcomeBalance.push(transaction.value)
    })
    balance.total = balance.incomeBalance.reduce((newVal, total) => newVal + total) -
      balance.outcomeBalance.reduce((newVal, total) => newVal + total)
    let response: Balance = {
      income: balance.incomeBalance.reduce((newVal, total) => newVal + total),
      outcome: balance.outcomeBalance.reduce((newVal, total) => newVal + total),
      total: balance.total
    }
    return response
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({ title, type, value })

    this.transactions.push(transaction)

    return transaction

  }
}

export default TransactionsRepository;
