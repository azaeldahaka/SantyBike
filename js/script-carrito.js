
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartAside = document.getElementById('cart-aside');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCart = document.getElementById('clear-cart');

    let cart = [];

    // Abrir y cerrar el carrito
    cartIcon.addEventListener('click', () => {
        //cartAside.style.top = `${window.scrollY}px`;
        cartAside.classList.toggle('open');
    });

    closeCart.addEventListener('click', () => {
        cartAside.classList.remove('open');
    });

    // Añadir al carrito
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card-prod');
            const product = {
                id: card.getAttribute('data-id'),
                nombre: card.getAttribute('data-nombre'),
                precio: parseFloat(card.getAttribute('data-precio')),
                cantidad: 1
            };
            addToCart(product);
        });
    });

    // Función para añadir al carrito
    function addToCart(product) {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            exists.cantidad++;
        } else {
            cart.push(product);
        }
        updateCart();
    }

    // Función para actualizar el carrito
    function updateCart() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.cantidad, 0);
        cartTotal.textContent = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio} x ${item.cantidad}</p>
                    <button class="remove-item btn-card" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItems.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Añadir funcionalidad a los botones de eliminar
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Vaciar el carrito
    clearCart.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
});