document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('message').textContent = 'Passwords do not match!';
        return;
    }

    const data = {
        fullName: fullName,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: confirmPassword,
    };

    try {
        const response = await fetch('http://localhost:8090/api/collections/users/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            const error = await response.json();
            document.getElementById('message').textContent = 'Error: ' + error.message;
            console.error('Error:', error);
        }
    } catch (err) {
        document.getElementById('message').textContent = 'An unexpected error occurred.';
        console.error('Unexpected error:', err);
    }
});
