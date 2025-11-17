const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');

async function signupUser(email, firstName, lastName) {
    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, firstName, lastName })
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


async function checkUserExists(email) {
    const response = await fetch('/users');
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const users = await response.json();

    console.log(users);

    return users.some(user => user.email === email); //.some is an array method that tests if any users email matches the passed in email and passes true or false depending on the outcome
}

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop default form submission

    const email = emailInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    try {

        const exists = await checkUserExists(email);
        if (exists) {
            alert('A user with this email already exists!');
            return;
        }

        const data = await signupUser(email, firstName, lastName);
        console.log('User created:', data);

        // Reset the form
        form.reset();

        //Page redirect
        window.location.href = 'admin.html';

    } catch (err) {
        console.error('Signup failed', err);
        alert('Signup failed. Please try again.');
    }
});