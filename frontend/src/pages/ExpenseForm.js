import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentYear = new Date().getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const [incomeAmount, setIncomeAmount] = useState('');
    const [expenseInfo, setExpenseInfo] = useState({ amount: '', text: '' });

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Submit Income
    const submitIncome = (e) => {
        e.preventDefault();
        if (!incomeAmount) return handleError('Please enter income amount');
        const parsedAmount = parseFloat(incomeAmount);
        if (isNaN(parsedAmount)) return handleError('Amount must be a number');

        addTransaction({
            text: 'Income',
            amount: Math.abs(parsedAmount),
            month,
            year
        });

        setIncomeAmount('');
    };

    // Submit Expense
    const submitExpense = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;
        if (!amount || !text) return handleError('Please add expense details');
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) return handleError('Amount must be a number');

        addTransaction({
            text,
            amount: -Math.abs(parsedAmount),
            month,
            year
        });

        setExpenseInfo({ amount: '', text: '' });
    };

    return (
        <div className='form-container' style={{ maxWidth: '400px', margin: '20px auto' }}>
            
            {/* Month & Year Select */}
            <div style={{
                marginBottom: '20px',
                padding: '10px',
                background: '#f1f1f1',
                borderRadius: '5px',
                textAlign: 'center'
            }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Month:</label>
                <select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                    style={dropdownStyle}
                >
                    {monthNames.map((m, index) => (
                        <option key={index} value={index + 1}>{m}</option>
                    ))}
                </select>

                <label style={{ fontWeight: 'bold', margin: '0 10px' }}>Year:</label>
                <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    style={dropdownStyle}
                >
                    {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                    ))}
                </select>
            </div>

            {/* Income Form */}
            <form onSubmit={submitIncome} style={formStyle('#e8f5e9')}>
                <h2 style={{ color: '#2e7d32', marginBottom: '10px' }}>Add Income</h2>
                <input
                    type='number'
                    placeholder='Amount...'
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    style={inputStyle}
                />
                <button type='submit' style={buttonStyle('#2e7d32')}>Add Income</button>
            </form>

            {/* Expense Form */}
            <form onSubmit={submitExpense} style={formStyle('#ffebee')}>
                <h2 style={{ color: '#c62828', marginBottom: '10px' }}>Add Expense</h2>
                <input
                    type='text'
                    name='text'
                    placeholder='Expense detail...'
                    value={expenseInfo.text}
                    onChange={(e) => setExpenseInfo(prev => ({ ...prev, text: e.target.value }))}
                    style={inputStyle}
                />
                <input
                    type='number'
                    name='amount'
                    placeholder='Amount...'
                    value={expenseInfo.amount}
                    onChange={(e) => setExpenseInfo(prev => ({ ...prev, amount: e.target.value }))}
                    style={inputStyle}
                />
                <button type='submit' style={buttonStyle('#c62828')}>Add Expense</button>
            </form>
        </div>
    );
}

// Reusable Styles
const dropdownStyle = {
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const formStyle = (bg) => ({
    padding: '20px',
    background: bg,
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
});

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const buttonStyle = (bg) => ({
    width: '100%',
    background: bg,
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
});

export default ExpenseForm;
