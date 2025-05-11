// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage Functions
    function saveData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }

    function loadData(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return defaultValue;
        }
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.body;
            const isDark = body.classList.contains('dark');
            body.classList.toggle('dark');
            saveData('theme', isDark ? 'light' : 'dark');
        });
    }

    // Load theme
    const savedTheme = loadData('theme', 'light');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    // Cart Functionality
    const cartCount = document.getElementById('cart-count');
    const addToCartBtn = document.getElementById('add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');

    function updateCart() {
        const cart = loadData('cart', []);
        cartCount.textContent = cart.length;
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            } else {
                cart.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
                        <span>${item.name} - $${item.price}</span>
                        <button class="btn" onclick="removeFromCart(${index})">Remove</button>
                    `;
                    cartItemsContainer.appendChild(div);
                });
            }
        }
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const product = {
                name: 'Smartphone X', // Example; dynamically set in real app
                price: 699
            };
            const cart = loadData('cart', []);
            cart.push(product);
            saveData('cart', cart);
            updateCart();
            alert('Added to cart!');
        });
    }

    window.removeFromCart = function(index) {
        const cart = loadData('cart', []);
        cart.splice(index, 1);
        saveData('cart', cart);
        updateCart();
    };

    updateCart();

    // Contact Form Validation (for contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };
        const errors = {
            name: document.getElementById('name-error'),
            email: document.getElementById('email-error'),
            message: document.getElementById('message-error')
        };

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validateField(input, errorElement, validationFn, errorMessage) {
            const value = input.value.trim();
            if (!validationFn(value)) {
                errorElement.textContent = errorMessage;
                return false;
            }
            errorElement.textContent = '';
            return true;
        }

        Object.values(inputs).forEach(input => {
            input.addEventListener('input', () => {
                const name = input.name;
                if (name === 'name') {
                    validateField(inputs.name, errors.name, val => val.length > 0, 'Name is required');
                } else if (name === 'email') {
                    validateField(inputs.email, errors.email, validateEmail, 'Invalid email format');
                } else if (name === 'message') {
                    validateField(inputs.message, errors.message, val => val.length > 0, 'Message is required');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = [
                validateField(inputs.name, errors.name, val => val.length > 0, 'Name is required'),
                validateField(inputs.email, errors.email, validateEmail, 'Invalid email format'),
                validateField(inputs.message, errors.message, val => val.length > 0, 'Message is required')
            ].every(Boolean);

            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }
});