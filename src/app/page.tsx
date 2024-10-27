'use client';

import { Container, Paper } from '@mui/material';
import { Dashboard } from '@/components/Dashboard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';

export default function Home() {
  const { transactions, addTransaction, removeTransaction } = useTransactions();

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Controle Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Paper className="p-4">
          <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
          <TransactionForm onSubmit={addTransaction} />
        </Paper>

        <Dashboard transactions={transactions} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Histórico de Transações</h2>
        <TransactionList
          transactions={transactions}
          onDelete={removeTransaction}
        />
      </div>
    </Container>
  );
}
