document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    let total = 0;
    container.innerHTML = '';

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
            <button onclick="removeItem(${index})">Eliminar</button>
        `;
        container.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').innerText = total.toFixed(2);
}

async function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return alert('El carrito está vacío');

    for (const item of cart) {
        try {
            const response = await fetch(`${CONFIG.BACKEND_URL}/api/stock/${item.id}/purchase?quantity=${item.quantity}`, {
                method: 'POST'
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.detail || 'Error en la compra');
        } catch (error) {
            alert(`Error comprando ${item.name}: ${error.message}`);
            return;
        }
    }

    alert('¡Compra realizada con éxito!');
    localStorage.removeItem('cart');
    window.location.href = 'catalog.html';
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
