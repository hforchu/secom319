const itemsContainer = document.getElementById('itemContainer');
const viewCartButton = document.getElementById('viewCart');
const cartContainer = document.getElementById('cartContainer');
const cart = [];

itemsData.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    itemsContainer.appendChild(itemDiv);
});

function addToCart(id) {
    const item = itemsData.find(item => item.id === id);
    cart.push(item);
}

viewCartButton.addEventListener('click', () => {
    cartContainer.innerHTML = '<h2>Cart</h2>';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
    cartContainer.classList.toggle('hidden');
});