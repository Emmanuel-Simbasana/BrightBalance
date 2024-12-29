import React, { useEffect, useState, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { Parser } from 'json2csv';

function Report() {
    const [expenses, setExpenses] = useState([]);
    const [categoryPercentages, setCategoryPercentages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'expenses'));
                const expensesData = querySnapshot.docs.map(doc => doc.data());
                setExpenses(expensesData);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const calculatedCategoryPercentages = useMemo(() => {
        if (!expenses.length) return {};

        const totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
        const categoryTotals = expenses.reduce((acc, expense) => {
            const category = expense.category || 'Uncategorized';
            acc[category] = (acc[category] || 0) + parseFloat(expense.amount || 0);
            return acc;
        }, {});

        const percentages = {};
        for (const category in categoryTotals) {
            percentages[category] = ((categoryTotals[category] / totalAmount) * 100).toFixed(2);
        }
        return percentages;
    }, [expenses]);

    const downloadPDF = () => {
        if (!expenses.length) {
            alert('No data available to download.');
            return;
        }

        const doc = new jsPDF();
        doc.text('Detailed Report', 10, 10);
        doc.text('Spending Analysis:', 10, 20);

        expenses.forEach((expense, index) => {
            doc.text(`${expense.name} - $${expense.amount} - ${expense.category}`, 10, 30 + (10 * index));
        });

        doc.text('Category Insights:', 10, 80);
        Object.keys(calculatedCategoryPercentages).forEach((category, index) => {
            doc.text(`${category}: ${calculatedCategoryPercentages[category]}%`, 10, 90 + (10 * index));
        });

        doc.save('report.pdf');
    };

    const downloadCSV = () => {
        if (!expenses.length) {
            alert('No data available to download.');
            return;
        }

        const fields = ['name', 'amount', 'category'];
        const parser = new Parser({ fields });
        const csv = parser.parse(expenses);

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'report.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h3>Detailed Report</h3>

            <div>
                <h4>Spending Analysis</h4>
                {expenses.length ? (
                    <ul>
                        {expenses.map((expense, index) => (
                            <li key={index}>
                                {expense.name} - ${expense.amount} - {expense.category}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No expenses recorded.</p>
                )}
            </div>

            <div>
                <h4>Category Insights</h4>
                {Object.keys(calculatedCategoryPercentages).length ? (
                    <ul>
                        {Object.keys(calculatedCategoryPercentages).map((category, index) => (
                            <li key={index}>
                                {category}: {calculatedCategoryPercentages[category]}%
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No insights available.</p>
                )}
            </div>

            <button
                onClick={downloadPDF}
                className="btn btn-secondary mt-3"
                disabled={!expenses.length}
            >
                Download PDF
            </button>
            <button
                onClick={downloadCSV}
                className="btn btn-secondary mt-3 ml-2"
                disabled={!expenses.length}
            >
                Download CSV
            </button>
        </div>
    );
}

export default Report;
