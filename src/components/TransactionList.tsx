import { Transaction } from '../types/Transaction';
import { Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from 'lucide-react';

type TransactionListProps = {
    transactions: Transaction[];
    onDelete: (id: string) => void;
};

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
    return (
        <Paper className="mt-4">
            <List>
                {transactions.map((transaction) => (
                    <ListItem
                        key={transaction.id}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => onDelete(transaction.id)}>
                                <Delete color={`${transaction.type === 'expense' ? 'red' : 'green'}`} />
                            </IconButton>
                        }
                        style={{
                            borderLeft: `2px solid ${transaction.type === 'income' ? 'green' : 'red'}`,
                            paddingLeft: '12px',
                            marginBottom: '8px',
                        }}
                    >
                        <ListItemText
                            primary={transaction.description}
                            secondary={`${transaction.type === 'expense' ? '-' : '+'} R$ ${transaction.amount.toFixed(2)} - ${transaction.category} - ${transaction.date}`}
                            className={transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}
                            style={{
                                marginBottom: '4px',
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};