document.addEventListener('DOMContentLoaded', function() {
    fetchOpenTicketsCount();
    fetchRecentTickets();
});

function fetchOpenTicketsCount() {
    fetch('http://127.0.0.1:5000/Tickets?status=open')
        .then(response => response.json())
        .then(data => {
            document.getElementById('openTicketsCount').textContent = `Open Tickets: ${data.length}`;
        })
        .catch(error => {
            console.error('Error fetching open tickets:', error);
        });
}

function fetchRecentTickets() {
    fetch('http://127.0.0.1:5000/Tickets?limit=5')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('recentTicketsList');
            list.innerHTML = '<h2>Recent Tickets</h2>';
            data.forEach(ticket => {
                const item = document.createElement('div');
                item.textContent = `Ticket ID: ${ticket['Ticket ID']}, Subject: ${ticket.Subject}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error fetching recent tickets:', error);
        });
}
