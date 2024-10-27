'use client'
import { useState, useEffect } from 'react';
import { Transaction } from '../types/Transaction';

// Este é um hook personalizado chamado useTransactions que gerencia as transações financeiras
export const useTransactions = () => {
    // Usa o useState para armazenar as transações
    // Inicializa o estado com os dados salvos no localStorage, se disponíveis
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('transactions');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Usa o useEffect para salvar as transações no localStorage sempre que elas mudarem
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    // Função para adicionar uma nova transação
    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(), // Gera um ID único para a nova transação
        };
        setTransactions(prev => [...prev, newTransaction]);
    };

    // Função para remover uma transação pelo ID
    const removeTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    // Retorna as transações e as funções para manipulá-las
    return { transactions, addTransaction, removeTransaction };
};