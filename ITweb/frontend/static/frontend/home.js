document.addEventListener('DOMContentLoaded', function() {
    fetchTicketsAndCount();
    document.getElementById('status-filter').addEventListener('change', filterTickets);
    // document.getElementById('new-ticket-button').addEventListener('click', showNewTicketForm);
    // document.getElementById('ticket-form').addEventListener('submit', submitNewTicket);
});

let allTickets = [];

function fetchTicketsAndCount() {
    fetch('http://127.0.0.1:5000/Tickets')
        .then(response => response.json())
        .then(data => {
            allTickets = data;
            countTickets(data);
            populateTicketsTable(data);
        })
        .catch(error => console.error('Error:', error));
}

function countTickets(tickets) {
    let openCount = 0;
    let closedCount = 0;

    tickets.forEach(ticket => {
        if (ticket.Status === 'open') {
            openCount++;
        } else if (ticket.Status === 'closed') {
            closedCount++;
        }
    });

    document.getElementById('open-count').textContent = openCount;
    document.getElementById('closed-count').textContent = closedCount;
}


function populateTicketsTable(tickets) {
    const tableBody = document.getElementById('tickets-table-body');
    tableBody.innerHTML = ''; // Clear existing table rows

    tickets.forEach(ticket => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = ticket['Ticket ID'];
        row.insertCell(1).textContent = ticket['Subject'];
        row.insertCell(2).textContent = ticket['Ticket Category'];
        row.insertCell(3).textContent = ticket['Status'];
    });
}

function filterTickets() {
    const filterValue = document.getElementById('status-filter').value;
    let filteredTickets = allTickets;

    if (filterValue !== 'all') {
        filteredTickets = allTickets.filter(ticket => ticket.Status === filterValue);
    }

    populateTicketsTable(filteredTickets);
}

// function showNewTicketForm() {
//     document.getElementById('new-ticket-form').style.display = 'block';
// }

// function submitNewTicket(event) {
//     event.preventDefault();

//     const formData = {
//         "user_id": parseInt(document.getElementById('user-id').value),
//         "department_id": parseInt(document.getElementById('department-id').value),
//         "prior_ticket_id": document.getElementById('prior-ticket-id').value ? parseInt(document.getElementById('prior-ticket-id').value) : null,
//         "ticket_category": document.getElementById('ticket-category').value,
//         "open_date_time": convertDateTime(document.getElementById('open-date-time').value),
//         "close_date_time": convertDateTime(document.getElementById('close-date-time').value),
//         "status": document.getElementById('status').value,
//         "description": document.getElementById('description').value,
//         "subject": document.getElementById('subject').value
//     };

//     fetch('http://127.0.0.1:5000/Tickets', {  // Adjust the URL as per your API endpoint
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         document.getElementById('new-ticket-form').style.display = 'none';
//         document.getElementById('ticket-form').reset();

//         // Refresh the ticket list
//         fetchTicketsAndCount();
//     })
//     .catch(error => console.error('Error:', error));
// }

// function convertDateTime(localDateTime) {
//     if (!localDateTime) return null;

//     const date = new Date(localDateTime);
//     return date.toGMTString();
// }