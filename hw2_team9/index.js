const itemList = document.getElementById("itemList");
const cartList = document.getElementById("cartList");
var total = 0;
// Get data from JSON
async function fetchItems() {
    const response = await fetch("index.json");
    const data = await response.json();
    return data;
}

// Render shoes in browse page
async function renderItems() {
    if (itemList) {
        const items = await fetchItems();
        items.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to cart</button>
            `;
            itemList.appendChild(itemDiv);
        });
    }
}

// Cart functions
function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Render cart items in cart page
async function renderCart() {
    if (cartList) {
        const cart = getCart();
        const items = await fetchItems();
        const cartItems = cart.map((id) => items.find((item) => item.id === id));

        cartList.innerHTML = "";
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
    }
}
// Render shoes in browse page with optional search term
async function renderItems(searchTerm = "") {
    if (itemList) {
        const items = await fetchItems();
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

        itemList.innerHTML = "";
        filteredItems.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to cart</button>
            `;
            itemList.appendChild(itemDiv);
        });
    }
}

async function calcTotal() {
    if (cartList) {
        const cart = getCart();
        const items = await fetchItems();
        const cartItems = cart.map((id) => items.find((item) => item.id === id));
        cartItems.forEach((item, index) => {
            total = total + item.price;
        });
        const content = `<h3>Total: ${total}</h3>`
        cartList.innerHTML += content;
    }
    
}
// Call the rendering functions
renderItems();
renderCart();
calcTotal();

const searchButton = document.getElementById("searchButton");
if (searchButton) {
    searchButton.addEventListener("click", () => {
        const searchTerm = document.getElementById("searchInput").value;
        renderItems(searchTerm);
    });
}

