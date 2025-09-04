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

const submitButton = document.getElementById('submit');
const userId = document.getElementById('userId');
const title = document.getElementById('title');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const postData = {
        id: 1,
        userId: parseInt(userId.value),
        title: title.value,
    };


    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error('Error:', error));
});


const deleteButton = document.getElementById('delete');
const postIdInput = document.getElementById('userId');

deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const postId = postIdInput.value;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    })

        .then(response => {
            if (response.ok) {
                console.log(`Post with ID ${postId} was deleted successfully.`);
                alert(`Post with ID ${postId} was deleted successfully.`);
            } else {
                console.error('Failed to delete the post.');
            }
        })
        .catch(error => console.error('Error:', error));
});