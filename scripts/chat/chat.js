async function loadMessages() {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/collections/messages/records?filter=(receiver='${userId}')`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        const messageContainer = document.getElementById('messages');
        messageContainer.innerHTML = '';

        for (const msg of data.items) {
            const userResponse = await fetch(`http://127.0.0.1:8090/api/collections/users/records/${msg.sender}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const userData = await userResponse.json();

            const msgElement = document.createElement('p');
            msgElement.innerHTML = `<strong>From ${userData.fullName}:</strong> ${msg.text}`;
            messageContainer.appendChild(msgElement);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMessages);

document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const receiverEmail = document.getElementById('receiverEmail').value;
    const message = document.getElementById('message').value;

    if (userId && receiverEmail && message) {
        try {
            const userResponse = await fetch(`http://127.0.0.1:8090/api/collections/users/records?filter=(email='${receiverEmail}')`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            const userData = await userResponse.json();

            if (userData.items.length === 0) {
                alert('Receiver not found!');
                return;
            }

            const receiverId = userData.items[0].id;
            if (receiverId === userId) {
                alert("You can't send a message to yourself!");
                return;
            }

            await fetch('http://127.0.0.1:8090/api/collections/messages/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    text: message,
                    sender: userId,
                    receiver: receiverId
                })
            });

            document.getElementById('message').value = '';
            loadMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
});
