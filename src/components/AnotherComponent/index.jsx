import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Подключаем CSS
import TableRow from './components/TableRow.jsx';

function AnotherComponent() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    const removeTransaction = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    return (
        <div className="container">
            <h1 className='title'>📊 Таблица торгов</h1>
            <button className="back-button" onClick={() => navigate('/')}>⬅ Вернуться на главную</button>
            <table className="crypto-table">
                <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Текущая цена (USDT)</th>
                    <th>Цена покупки (USDT)</th>
                    <th>Количество</th>
                    <th>Прибыль/Убыток (USDT)</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((tx, index) => (
                    <TableRow key={index} transaction={tx} onRemove={() => removeTransaction(index)} />
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AnotherComponent;