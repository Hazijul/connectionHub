document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Settings Navigation
    const settingsNavItems = document.querySelectorAll('.settings-nav-item');
    const settingsSections = document.querySelectorAll('.settings-section');

    settingsNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            settingsNavItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all sections
            settingsSections.forEach(section => section.classList.remove('active'));
            // Show selected section
            const sectionId = item.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Profile Picture Change
    const changePictureBtn = document.querySelector('.change-picture-btn');
    changePictureBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const profilePics = document.querySelectorAll('.profile-pic');
                    profilePics.forEach(pic => {
                        pic.src = e.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Form Validation and Save
    const saveButtons = document.querySelectorAll('.btn-primary');
    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const form = button.closest('.settings-card');
            const inputs = form.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Settings saved successfully!';
                form.appendChild(successMessage);

                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    });

    // Theme Selection
    const themeOptions = document.querySelectorAll('.theme-option');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    document.body.setAttribute('data-theme', savedTheme);
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        }
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            option.classList.add('active');

            // Get selected theme
            const theme = option.getAttribute('data-theme');
            
            // Apply theme
            document.body.setAttribute('data-theme', theme);
            
            // Save theme preference
            localStorage.setItem('theme', theme);

            // Update theme icon
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.className = 'theme-icon fas ' + (theme === 'dark' ? 'fa-moon' : 'fa-sun');
            }
        });
    });

    // System theme detection
    if (savedTheme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // Color Scheme Selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const color = getComputedStyle(option).getPropertyValue('--color');
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('primary-color', color);
        });
    });

    // Font Size Slider
    const fontSizeSlider = document.querySelector('.font-size-slider input');
    fontSizeSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        document.documentElement.style.setProperty('--font-size', `${size}rem`);
        localStorage.setItem('font-size', size);
    });

    // Load saved preferences
    function loadPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (themeOption) {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                themeOption.classList.add('active');
            }
        }

        // Load color scheme
        const savedColor = localStorage.getItem('primary-color');
        if (savedColor) {
            document.documentElement.style.setProperty('--primary-color', savedColor);
            const colorOption = document.querySelector(`[style*="${savedColor}"]`);
            if (colorOption) {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                colorOption.classList.add('active');
            }
        }

        // Load font size
        const savedFontSize = localStorage.getItem('font-size');
        if (savedFontSize) {
            document.documentElement.style.setProperty('--font-size', `${savedFontSize}rem`);
            fontSizeSlider.value = savedFontSize;
        }
    }

    // Initialize preferences
    loadPreferences();

    // Connected Accounts
    const connectButtons = document.querySelectorAll('.btn-primary');
    connectButtons.forEach(button => {
        if (button.textContent.includes('Connect')) {
            button.addEventListener('click', () => {
                const accountItem = button.closest('.account-item');
                const accountName = accountItem.querySelector('h3').textContent;
                const status = accountItem.querySelector('p');
                
                // Simulate connection process
                button.disabled = true;
                button.textContent = 'Connecting...';
                
                setTimeout(() => {
                    status.textContent = 'Connected';
                    button.textContent = 'Disconnect';
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-secondary');
                    button.disabled = false;
                }, 1500);
            });
        }
    });

    // Disconnect Accounts
    const disconnectButtons = document.querySelectorAll('.btn-secondary');
    disconnectButtons.forEach(button => {
        if (button.textContent.includes('Disconnect')) {
            button.addEventListener('click', () => {
                const accountItem = button.closest('.account-item');
                const accountName = accountItem.querySelector('h3').textContent;
                const status = accountItem.querySelector('p');
                
                // Simulate disconnection process
                button.disabled = true;
                button.textContent = 'Disconnecting...';
                
                setTimeout(() => {
                    status.textContent = 'Not Connected';
                    button.textContent = 'Connect';
                    button.classList.remove('btn-secondary');
                    button.classList.add('btn-primary');
                    button.disabled = false;
                }, 1500);
            });
        }
    });

    // Payment Method Management
    const removePaymentButtons = document.querySelectorAll('.btn-text');
    removePaymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paymentItem = button.closest('.payment-item');
            if (confirm('Are you sure you want to remove this payment method?')) {
                paymentItem.remove();
            }
        });
    });

    // Add Payment Method
    const addPaymentButton = document.querySelector('.btn-secondary');
    if (addPaymentButton && addPaymentButton.textContent.includes('Add Payment Method')) {
        addPaymentButton.addEventListener('click', () => {
            // Here you would typically open a payment method form
            alert('Payment method form would be implemented here!');
        });
    }

    // Plan Upgrade
    const upgradeButton = document.querySelector('.btn-primary');
    if (upgradeButton && upgradeButton.textContent.includes('Upgrade Plan')) {
        upgradeButton.addEventListener('click', () => {
            // Here you would typically show available plans
            alert('Plan selection modal would be implemented here!');
        });
    }
}); 