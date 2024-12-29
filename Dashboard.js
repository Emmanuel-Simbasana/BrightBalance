// Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <h2>Welcome, {currentUser.displayName || currentUser.email}</h2>
            <h3>Your Expenses</h3>
            {/* Expenses tracker code goes here */}
        </div>
    );
};

export default Dashboard;