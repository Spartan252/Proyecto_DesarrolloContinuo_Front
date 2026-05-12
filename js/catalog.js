document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    const response = await fetch(`${CONFIG.BACKEND_URL}/api/stock/`);
    const products = await response.json();
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.nombre}</h3>
            <p>SKU: ${product.sku}</p>
            <p class="price">$${product.price}</p>
            <p>Disponible: ${product.quantity}</p>
            <button onclick="addToCart(${product.id}, '${product.nombre}', ${product.price})">Añadir al carrito</button>
        `;
        container.appendChild(card);
    });
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} añadido al carrito`);
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
