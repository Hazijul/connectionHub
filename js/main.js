document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked button and corresponding form
            btn.classList.add('active');
            const formId = `${btn.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Form submission handling
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password });
        
        // For demo purposes, redirect to profile page
        window.location.href = 'profile.html';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', { fullName, email, password });
        
        // For demo purposes, redirect to profile page
        window.location.href = 'profile.html';
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList[1]; // google, facebook, or twitter
            console.log(`${platform} login clicked`);
            // Here you would implement social login functionality
        });
    });
}); 