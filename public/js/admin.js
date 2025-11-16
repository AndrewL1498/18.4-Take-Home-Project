const usersTableBody = document.querySelector('#users-table tbody');

async function loadUsers() {
    try {
        const response = await fetch('/users'); // GET request to backend
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const users = await response.json(); // array of users

        // Clear table before adding rows
        usersTableBody.innerHTML = '';

        // Loop through users and create rows
        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.email || ''}</td>
                <td>${user.firstName || ''}</td>
                <td>${user.lastName || ''}</td>
                <td>${user.state || ''}</td>
            `;

            usersTableBody.appendChild(row);
        });

    } catch (err) {
        console.error('Failed to load users', err);
        usersTableBody.innerHTML = '<tr><td colspan="5">Failed to load users</td></tr>';
    }
}

// Call loadUsers when the page loads
window.addEventListener('DOMContentLoaded', loadUsers);
