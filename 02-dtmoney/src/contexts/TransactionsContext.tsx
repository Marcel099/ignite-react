import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type Transaction = {
  id: number
  title: string
  amount: number
  type: 'deposit' | 'withdraw'
  category: string
  createdAt: string
}

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>


type TransactionsContextData = {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextData>(
  // forçando aceitar um tipo que ainda não é válido
  {} as TransactionsContextData
);


type TransactionsProviderProps = {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(()  => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
