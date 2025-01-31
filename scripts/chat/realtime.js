const evtSource = new EventSource('http://127.0.0.1:8090/api/realtime');

evtSource.addEventListener('PB_CONNECT', function (e) {
    console.log('Connected to PocketBase:', e);
    const id = e.lastEventId;

    fetch('http://127.0.0.1:8090/api/realtime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            clientId: id,
            subscriptions: ['messages']
        })
    });
});

evtSource.addEventListener('messages', function (e) {
    const data = JSON.parse(e.data);
    console.log('New message received:', data);
    if (data.action === 'create' && data.record.receiver === userId) {
        loadMessages();
    }
});
