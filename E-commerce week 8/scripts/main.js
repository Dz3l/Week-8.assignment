    // Load cart count from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    document.getElementById('cartCount').textContent = cartCount;

    // Handle Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productElem = e.target.closest('.product');
        const product = {
          id: productElem.dataset.id,
          name: productElem.dataset.name,
          price: parseFloat(productElem.dataset.price)
        };

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cartCount').textContent = cart.length;
        alert(`${product.name} added to cart!`);
      });
    });

    // Redirect on Shop Now
    document.getElementById('shopNowBtn').addEventListener('click', () => {
      window.location.href = 'products.html';
    });