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

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop default form submission

    const email = emailInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    try {
        const data = await signupUser(email, firstName, lastName);
        console.log('User created:', data);

        // Optional: show success message
        alert(`Signup successful! Your ID is ${data.id}`);

        // Reset the form
        form.reset();

    } catch (err) {
        console.error('Signup failed', err);
        alert('Signup failed. Please try again.');
    }
});