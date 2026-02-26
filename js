 // Load products
const defaultProducts = [
    { id: 1, name: "Red Clay Bricks", price: 5500, category: "bricks" },
    { id: 2, name: "Fly Ash Bricks", price: 6000, category: "bricks" },
    { id: 3, name: "Basmati Rice 25kg", price: 1200, category: "grocery" },
    { id: 4, name: "Cooking Oil 5L", price: 750, category: "grocery" }
];

if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
}

function loadProducts(category) {
    const products = JSON.parse(localStorage.getItem("products"));
    const list = document.getElementById("productList");
    if (!list) return;
    list.innerHTML = "";

    const filtered = products.filter(p => p.category === category);

    filtered.forEach(p => {
        list.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

// Register
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Registered Successfully");
    window.location.href = "login.html";
}

// Login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        alert("Login Successful");
        window.location.href = "index.html";
    } else {
        alert("Invalid Credentials");
    }
}

// Seller Add Product
function addProduct() {
    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const category = document.getElementById("pcategory").value;

    let products = JSON.parse(localStorage.getItem("products"));
    products.push({
        id: Date.now(),
        name,
        price,
        category
    });

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Added");
}

// Load Cart
function loadCart() {
    const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
    const products = JSON.parse(localStorage.getItem("products"));
    const cartList = document.getElementById("cartList");

    if (!cartList) return;

    cartList.innerHTML = "";

    cartIds.forEach(id => {
        const product = products.find(p => p.id === id);
        if (product) {
            cartList.innerHTML += `<p>${product.name} - ₹${product.price}</p>`;
        }
    });
}