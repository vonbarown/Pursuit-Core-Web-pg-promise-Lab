const port = 3000;

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);

    loadPosts();
    const postForm = document.querySelector('#addPosts');
    postForm.addEventListener('submit', addPostsFormSubmitted);
});

const loadUsers = async () => {
    const usersList = document.querySelector('#usersList');
    usersList.textContent = "";
    const {
        data
    } = await axios.get(`http://localhost:${port}/users`);
    console.log(data);

    data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

const addUserFormSubmitted = async (event) => {
    event.preventDefault();
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, {
        firstname,
        lastname,
        age
    });
    loadUsers();
}

const loadPosts = async () => {
    const postsList = document.querySelector('#postsList');
    usersList.textContent = "";
    const {
        data
    } = await axios.get(`http://localhost:${port}/posts`);
    console.log(data);

    data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `User: ${user.poster_id}  Posted: ${user.body}`;
        postsList.appendChild(listItem);
    });
}

const addPostsFormSubmitted = async (event) => {
    event.preventDefault();
    const poster_id = document.querySelector('#userIdInput').value;
    const body = document.querySelector('#bodyInput').value;
    console.log('input', poster_id, body);

    let response = await axios.post(`http://localhost:${port}/posts/register`, {
        poster_id,
        body,
    });
    loadPosts();
}