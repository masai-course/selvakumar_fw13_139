document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
  
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      window.location.href = 'index.html';
    } else {
      console.log('Invalid credentials', storedUser);
    }
});
