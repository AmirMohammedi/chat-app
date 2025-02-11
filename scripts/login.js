document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(
            'http://localhost:8090/api/collections/users/auth-with-password',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identity: email,
                    password: password,
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = 'Login successful!';
            console.log('User authenticated:', data);

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.record.id);
            localStorage.setItem('fullName', data.record.fullName);

            window.location.href = 'chat.html';
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
