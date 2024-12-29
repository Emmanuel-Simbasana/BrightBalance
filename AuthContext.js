// AuthContext.js
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loading from '../components/Loading'; // Import the Loading component

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        }, (error) => {
            setError(error.message);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const value = { currentUser, logout, error };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children} {/* Show Loading component if loading */}
        </AuthContext.Provider>
    );
}