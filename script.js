let cart = [];
let loggedInUser = null;

function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("El usuario ya existe.");
    } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registro exitoso. Puede iniciar sesión.");
        document.getElementById("reg-username").value = "";
        document.getElementById("reg-password").value = "";
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (users[username] && users[username] === password) {
        loggedInUser = username;
        document.getElementById("user-name").innerText = username;
        
        document.getElementById("login-form").style.display = "none";
        document.getElementById("login-box").style.display = "none";
        document.querySelector(".welcome-banner").style.display = "block";
        document.querySelector(".vehicles").style.display = "flex";
        document.querySelector(".cart").style.display = "block";

        alert(`Bienvenido, ${username}!`);
    } else {
        document.querySelector(".error").innerText = "Credenciales incorrectas. Intente de nuevo.";
    }
}

function logout() {
    loggedInUser = null;
    document.getElementById("login-form").style.display = "block";
    document.getElementById("login-box").style.display = "block";
    document.querySelector(".welcome-banner").style.display = "none";
    document.querySelector(".vehicles").style.display = "none";
    document.querySelector(".cart").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function addToCart(name, price) {
    if (!loggedInUser) {
        alert("Debe iniciar sesión para agregar vehículos al carrito.");
        return;
    }
    
    cart.push({ name, price });
    updateCartDisplay();
    alert(`Vehículo agregado al carrito: ${name}`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function emptyCart() {
    cart = [];
    updateCartDisplay();
    alert("Carrito vaciado.");
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agregue vehículos antes de finalizar la compra.");
        return;
    }
    alert("Compra finalizada. Gracias por su compra!");
    emptyCart();
}

function updateCartDisplay() {
    const cartInfo = document.getElementById("cart-info");
    const cartItemsList = document.querySelector(".cart-items");

    cartItemsList.innerHTML = "";
    
    if (cart.length === 0) {
        cartInfo.innerText = "No hay vehículos en el carrito.";
    } else {
        cartInfo.innerText = `Actualmente hay ${cart.length} vehículo(s) en el carrito.`;

        cart.forEach((vehicle, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${vehicle.name} - $${vehicle.price} 
            <button onclick="removeFromCart(${index})">Eliminar</button>`;
            cartItemsList.appendChild(listItem);
        });
    }
}

window.onload = function () {
    document.querySelector(".vehicles").style.display = "none";
    document.querySelector(".cart").style.display = "none";
};
