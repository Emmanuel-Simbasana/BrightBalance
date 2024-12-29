import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const commonCategories = ["Food", "Transportation", "Entertainment", "Utilities", "Healthcare", "Other"];

function ExpenseForm() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState(commonCategories);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const categoriesData = querySnapshot.docs.map(doc => doc.data().name);
            setCategories([...commonCategories, ...categoriesData]);
        };
        fetchCategories();
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const expenseCategory = category || newCategory;

        if (expenseCategory && Number(amount) > 0) {
            setLoading(true);
            try {
                await addDoc(collection(db, 'expenses'), { name, amount: Number(amount), category: expenseCategory });
                if (newCategory && !categories.includes(newCategory)) {
                    await addDoc(collection(db, 'categories'), { name: newCategory });
                    setCategories([...categories, newCategory]);
                }
                setName('');
                setAmount('');
                setCategory('');
                setNewCategory('');
            } catch (error) {
                setError("Error adding expense: " + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please select or add a category and enter a valid amount.');
        }
    }, [name, amount, category, newCategory, categories]);

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Expense Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" required min="0" />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Or Add New Category</label>
                <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Expense'}
            </button>
        </form>
    );
}

export default ExpenseForm;