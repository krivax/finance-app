'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types/Transaction';
import { Paper } from '@mui/material';

type DashboardProps = {
    transactions: Transaction[];
};

export const Dashboard = ({ transactions }: DashboardProps) => {
    const totalBalance = transactions.reduce(
        (acc, curr) => acc + (curr.type === 'income' ? curr.amount : -curr.amount),
        0
    );

    const monthlyData = transactions.reduce((acc: Record<string, { income: number; expense: number }>, curr) => {
        const month = curr.date.substring(0, 7);
        if (!acc[month]) {
            acc[month] = { income: 0, expense: 0 };
        }
        if (curr.type === 'income') {
            acc[month].income += curr.amount;
        } else {
            acc[month].expense += curr.amount;
        }
        return acc;
    }, {});

    const chartData = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense
    }));

    return (
        <Paper className="p-4">
            <div className="mb-4 text-xl">
                Saldo Total:
                <span className={totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}>
                    R$ {totalBalance.toFixed(2)}
                </span>
            </div>

            <div className="w-full py-4">
                <LineChart width={500} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Receitas" />
                    <Line type="monotone" dataKey="expense" stroke="#f44336" name="Despesas" />
                </LineChart>
            </div>
        </Paper>
    );
};