fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userEmail, password: userPassword })
})
.then(res => {
    console.log('User logged in successfully');
    window.location.href = 'http://127.0.0.1:5500/ExpressApp/mysqllogin/index.html';
})
.catch((err) => {
    console.error('Error logging in:', err);
    alert('Error logging in. Please try again.');
});
