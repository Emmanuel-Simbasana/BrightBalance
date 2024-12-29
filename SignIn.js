import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup, 
    RecaptchaVerifier, 
    signInWithPhoneNumber 
} from "firebase/auth";
import { useHistory } from 'react-router-dom';

function SignIn() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        verificationCode: '',
    });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const redirectToDashboard = () => history.push('/dashboard');

    const signInWithEmail = async () => {
        try {
            await signInWithEmailAndPassword(auth, formState.email, formState.password);
            redirectToDashboard();
        } catch (error) {
            setError(error.message);
        }
    };

    const sendPasswordReset = async () => {
        if (!formState.email) {
            setError('Please enter your email address first.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, formState.email);
            alert('Password reset email sent!');
        } catch (error) {
            setError(error.message);
        }
    };

    const socialSignIn = async (Provider) => {
        const provider = new Provider();
        try {
            await signInWithPopup(auth, provider);
            redirectToDashboard();
        } catch (error) {
            setError(error.message);
        }
    };

    const signInWithPhone = async () => {
        try {
            const recaptchaVerifier = new RecaptchaVerifier(
                'send-code',
                { size: 'invisible' },
                auth
            );
            const confirmationResult = await signInWithPhoneNumber(auth, formState.phoneNumber, recaptchaVerifier);
            window.confirmationResult = confirmationResult;
        } catch (error) {
            setError(error.message);
        }
    };

    const verifyPhoneNumber = async () => {
        try {
            const result = await window.confirmationResult.confirm(formState.verificationCode);
            redirectToDashboard();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="email" 
                name="email" 
                value={formState.email} 
                onChange={handleInputChange} 
                placeholder="Email" 
                aria-label="Email" 
            />
            <input 
                type="password" 
                name="password" 
                value={formState.password} 
                onChange={handleInputChange} 
                placeholder="Password" 
                aria-label="Password" 
            />
            <button onClick={signInWithEmail}>Sign In with Email</button>
            <button onClick={sendPasswordReset}>Forgot Password?</button>

            <button onClick={() => socialSignIn(GoogleAuthProvider)}>Sign In with Google</button>
            <button onClick={() => socialSignIn(FacebookAuthProvider)}>Sign In with Facebook</button>
            
            <input 
                type="tel" 
                name="phoneNumber" 
                value={formState.phoneNumber} 
                onChange={handleInputChange} 
                placeholder="Phone Number" 
                aria-label="Phone Number" 
            />
            <button id="send-code" onClick={signInWithPhone}>Send Code</button>
            
            <input 
                type="text" 
                name="verificationCode" 
                value={formState.verificationCode} 
                onChange={handleInputChange} 
                placeholder="Verification Code" 
                aria-label="Verification Code" 
            />
            <button onClick={verifyPhoneNumber}>Verify Code</button>
        </div>
    );
}

export default SignIn;
