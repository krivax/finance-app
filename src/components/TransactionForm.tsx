'use client'
import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Transaction } from '../types/Transaction';

type TransactionFormProps = {
    onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
};

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense' as 'expense' | 'income',
        category: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: Number(formData.amount)
        });
        setFormData({
            description: '',
            amount: '',
            type: 'expense',
            category: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
                label="Descrição"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
            />
            <TextField
                label="Valor"
                type="number"
                value={formData.amount}
                onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
            />
            <FormControl>
                <InputLabel>Tipo</InputLabel>
                <Select
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                >
                    <MenuItem value="income">Receita</MenuItem>
                    <MenuItem value="expense">Despesa</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Categoria"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
            />
            <TextField
                type="date"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
            />
            <Button variant="contained" type="submit" className="mt-4">
                Adicionar Transação
            </Button>
        </form>
    );
};
