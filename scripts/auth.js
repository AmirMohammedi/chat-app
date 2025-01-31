const authToken = localStorage.getItem('authToken');

if (authToken) {
    window.location.href = 'chat.html';
}
