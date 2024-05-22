// fetch('http://localhost:3000/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email: userEmail, password: userPassword })
// })
// .then(res = 200) => {
//     console.log('User logged in successfully');
//     window.location.href = 'http://127.0.0.1:5500/ExpressApp/mysqllogin/index.html';
// })
// .catch((err) => {
//     console.error('Error logging in:', err);
//     alert('Error logging in. Please try again.');
// });

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            messageDiv.innerText = 'Please enter both email and password.';
            return;
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('User logged in successfully');
                window.location.href = 'http://127.0.0.1:5500/ExpressApp/mysqllogin/dashboard.html';
            } else {
                return res.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .catch((err) => {
            console.error('Error logging in:', err);
            alert('Error logging in. Please try again.');
        });
    });
});