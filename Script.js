<script>
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('expense-name').value.trim();
    const amount = document.getElementById('expense-amount').value.trim();
    
    // Form validation
    if (!name || !amount) {
        alert('Please fill in all fields.');
        return;
    }
    
    addExpense(name, amount);
    document.getElementById('expense-form').reset();
});

var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }

document.getElementById('email-signin').addEventListener('click', () => {
    signInWithEmail();
});

document.getElementById('google-signin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithProvider(provider);
});

document.getElementById('facebook-signin').addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    signInWithProvider(provider);
});

document.getElementById('phone-signin').addEventListener('click', () => {
    document.getElementById('phone-auth').classList.remove('d-none');
    setupPhoneAuth();
});

function signInWithEmail() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    
    if (!email || !password) {
        alert('Email and password are required.');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Signed in with email:', userCredential.user);
        })
        .catch((error) => {
            alert(`Error signing in with email: ${error.message}`);
            console.error('Error signing in with email:', error);
        });
}

function signInWithProvider(provider) {
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Signed in with provider:', result.user);
        })
        .catch((error) => {
            alert(`Error signing in with ${provider.providerId}: ${error.message}`);
            console.error('Error signing in with provider:', error);
        });
}

function setupPhoneAuth() {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code', {
        'size': 'invisible',
        'callback': (response) => {
            console.log('Recaptcha verified:', response);
        }
    });

    document.getElementById('send-code').addEventListener('click', () => {
        const phoneNumber = document.getElementById('phone-number').value.trim();
        
        if (!phoneNumber) {
            alert('Phone number is required.');
            return;
        }

        auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log('SMS sent:', confirmationResult);
            })
            .catch((error) => {
                alert(`Error sending SMS: ${error.message}`);
                console.error('Error sending SMS:', error);
            });
    });

    document.getElementById('verify-code').addEventListener('click', () => {
        const code = document.getElementById('verification-code').value.trim();
        
        if (!code) {
            alert('Verification code is required.');
            return;
        }

        window.confirmationResult.confirm(code)
            .then((result) => {
                console.log('Phone number verified:', result.user);
            })
            .catch((error) => {
                alert(`Error verifying code: ${error.message}`);
                console.error('Error verifying code:', error);
            });
    });
}

function addExpense(name, amount) {
    const expenseList = document.getElementById('expenses-list');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `${name} <span>$${amount}</span>`;
    expenseList.appendChild(listItem);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch((error) => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}
</script>