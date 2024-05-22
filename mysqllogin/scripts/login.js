fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userEmail, password: userPassword })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();  // Parse JSON response
})
.then(data => {
    console.log("Response data:", data);  // Log the entire data object
    if (data.success) {
        console.log(data.message); // Log the successful login message
        setTimeout(() => {
            console.log("Redirecting to:", data.redirectUrl);
            window.location.href = 'http://127.0.0.1:5500/mysqllogin/dashboard.html'; // Redirect after 5 seconds
        }, 5000);
    } else {
        console.error(data.message); // Show error message
    }
})
.catch(error => {
    console.error('Error:', error); // Handle errors such as network issues
});