auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        return userCredential.user.sendEmailVerification();
    })
    .then(() => {
        console.log('Verification email sent');
        alert('A verification email has been sent to your email address. Please check your inbox.');
    })
    .catch((error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                console.error('Invalid email format.');
                alert('Please enter a valid email address.');
                break;
            case 'auth/weak-password':
                console.error('Weak password.');
                alert('Password should be at least 6 characters long.');
                break;
            default:
                console.error('Error creating account:', error);
                alert('An error occurred during account creation. Please try again.');
        }
    });