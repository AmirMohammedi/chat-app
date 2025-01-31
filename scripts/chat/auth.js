const loggedInUser = localStorage.getItem('fullName') || '';
const userId = localStorage.getItem('userId');
const authToken = localStorage.getItem('authToken');

if (!authToken) {
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}

document.getElementById('userEmailDisplay').textContent = loggedInUser || 'Unknown';
