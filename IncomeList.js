import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ConfirmationDialog from './ConfirmationDialog';

function IncomeList() {
    const [incomes, setIncomes] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editSource, setEditSource] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [incomeToDelete, setIncomeToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'income'));
                const incomesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setIncomes(incomesData);
            } catch (err) {
                setError('Failed to fetch incomes');
            } finally {
                setLoading(false);
            }
        };
        fetchIncomes();
    }, []);

    const editIncome = (income) => {
        setEditMode(income.id);
        setEditSource(income.source);
        setEditAmount(income.amount);
    };

    const updateIncome = useCallback(async (id) => {
        if (!editSource || isNaN(editAmount) || editAmount <= 0) {
            alert('Please enter valid source and amount');
            return;
        }
        try {
            await updateDoc(doc(db, 'income', id), { source: editSource, amount: editAmount });
            setIncomes(incomes.map(income => income.id === id ? { id, source: editSource, amount: editAmount } : income));
            setEditMode(null);
        } catch (err) {
            setError('Failed to update income');
        }
    }, [editSource, editAmount, incomes]);

    const handleDeleteConfirmation = (income) => {
        setIncomeToDelete(income);
        setShowDialog(true);
    };

    const handleDelete = useCallback(async () => {
        try {
            await deleteDoc(doc(db, 'income', incomeToDelete.id));
            setIncomes(incomes.filter(item => item.id !== incomeToDelete.id));
        } catch (err) {
            setError('Failed to delete income');
        } finally {
            setShowDialog(false);
            setIncomeToDelete(null);
        }
    }, [incomeToDelete, incomes]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h3>Incomes</h3>
            <ul className="list-group">
                {incomes.map(income => (
                    <li key={income.id} className="list-group-item">
                        {editMode === income.id ? (
                            <div>
                                <input type="text" value={editSource} onChange={(e) => setEditSource(e.target.value)} />
                                <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                                <button onClick={() => updateIncome(income.id)} className="btn btn-primary btn-sm">Save</button>
                            </div>
                        ) : (
                            <div>
                                {income.source} - ${income.amount}
                                <button onClick={() => editIncome(income)} className="btn btn-info btn-sm ml-2">Edit</button>
                                <button onClick={() => handleDeleteConfirmation(income)} className="btn btn-danger btn-sm ml-2">Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <ConfirmationDialog
                show={showDialog}
                handleClose={() => setShowDialog(false)}
                handleConfirm={handleDelete}
                message="Are you sure you want to delete this income source?"
            />
        </div>
    );
}

export default IncomeList;