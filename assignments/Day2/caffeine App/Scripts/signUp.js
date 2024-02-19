document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const newUser = {
      fullname,
      email,
      phone,
      password
    };

    localStorage.setItem('userInfo', JSON.stringify(newUser));

    window.location.href = 'index.html';
});
