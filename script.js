const userDetails = document.getElementById('user-details');
const usersList = document.getElementById('users-list');


fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            li.style.cursor = 'pointer';
            li.style.color = 'green';
            li.style.textDecoration = 'underline';
            li.addEventListener('click', () => showUserDetails(user.id));

            usersList.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching users:', error));

function showUserDetails(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            userDetails.innerHTML = `
                        <h2>${user.name}</h2>
                        <p><strong>Username:</strong> ${user.username}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                        <p><strong>Company:</strong> ${user.company.name}</p>
                        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                    `;
        })
        .catch(error => console.error('Error fetching user details:', error));
}