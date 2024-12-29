import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';

function ExpenseChart() {
    const [expenses, setExpenses] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchExpenses = async () => {
            const querySnapshot = await getDocs(collection(db, 'expenses'));
            const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setExpenses(expensesData);
            prepareChartData(expensesData);
        };
        fetchExpenses();
    }, []);

    const prepareChartData = (expenses) => {
        const categoryTotals = {};
        expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });

        setChartData({
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
        });
    };

    return (
        <div>
            <h3>Expense Chart</h3>
            <Pie data={chartData} />
        </div>
    );
}

export default ExpenseChart;