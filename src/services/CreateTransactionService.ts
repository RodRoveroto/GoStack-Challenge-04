import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionModel {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {
  }

  public execute({ title, type, value }: TransactionModel): Transaction {
    if (type === "outcome") {

      if (this.transactionsRepository.getBalance().total < value) {
        throw Error("value above the total value")
      }
    }
    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction
  }
}

export default CreateTransactionService;
