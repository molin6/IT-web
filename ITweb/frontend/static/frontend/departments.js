document.addEventListener('DOMContentLoaded', function() {
    fetchAverageResolutionTimes();
    fetchDepartments();
});

function fetchAverageResolutionTimes() {
    fetch('http://localhost:5000/Departments/AvgResolutionTimes')
        .then(response => response.json())
        .then(data => {
            populateBanner(data);
        })
        .catch(error => console.error('Error:', error));
}

function populateBanner(data) {
    const banner = document.getElementById('moving-banner');
    data.forEach(dept => {
        const deptInfo = document.createElement('span');
        deptInfo.textContent = `${dept['Department Name']}: ${dept['Average Resolution Time']} | `;
        deptInfo.style.marginRight = "20px"; // Spacing between items
        banner.appendChild(deptInfo);
    });
}

function fetchDepartments() {
    fetch('http://localhost:5000/Departments')
        .then(response => response.json())
        .then(data => {
            populateDepartmentsTable(data);
        })
        .catch(error => console.error('Error:', error));
}

function populateDepartmentsTable(departments) {
    const tableBody = document.getElementById('departments-table-body');
    departments.forEach(dept => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = dept['Name'];
        row.insertCell(1).textContent = dept['Email Address'];
        row.insertCell(2).textContent = dept['Phone Number'];
    });
}