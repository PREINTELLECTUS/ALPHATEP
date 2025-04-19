document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!username || !password) {
                alert('Por favor ingrese usuario y contraseña');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Login attempt with:', { username, password });
            
            // For demo purposes, show a message
            alert('Login successful (demo)');
            
            // Reset the form
            loginForm.reset();
        });
    }
    
    // Add click handlers for other elements
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password recovery feature would be implemented here');
    });
    
    document.querySelector('.guest-access').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Guest access feature would be implemented here');
    });
});