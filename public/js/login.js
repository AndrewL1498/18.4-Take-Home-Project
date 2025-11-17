const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;

    try {
        const response = await fetch('/users');
        const users = await response.json();
        const user = users.find(u => u.email === email);

    if (!user) {
      alert("User not found!");
      return;
    }

    console.log("Logged in user:", user);
    window.location.href = 'admin.html';

  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
});