// Initialize shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

// Function to add items to the cart
function addToCart(itemName, itemPrice, itemImage) {
    let item = { name: itemName, price: itemPrice, image: itemImage };
    cart.push(item);
    totalPrice += itemPrice;
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
    updateCart();
}

// Function to update cart UI with images
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalDisplay = document.getElementById("cart-total");

    if (!cartList || !totalDisplay) {
        console.error("Cart elements not found!");
        return;
    }

    cartList.innerHTML = "";
    totalPrice = 0;

    cart.forEach((product, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<img src="${product.image}" alt="${product.name}" class="cart-img"> 
                        ${product.name} - $${product.price} 
                        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartList.appendChild(li);
        totalPrice += product.price;
    });

    localStorage.setItem("cart", JSON.stringify(cart)); // Ensure changes are saved
    totalDisplay.innerText = totalPrice;
}

// Function to permanently remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from array
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0); // Update total price
    localStorage.setItem("cart", JSON.stringify(cart)); // Save new cart data
    updateCart(); // Refresh cart UI
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Total Purchase: $${totalPrice}. Redirecting to Checkout Page...`);
    window.location.href = "checkout.html";
}
// Function to show checkout pop-up
function checkoutPopup() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let checkoutModal = document.getElementById("checkout-popup");
    let checkoutTotal = document.getElementById("checkout-total");
    
    checkoutTotal.innerText = `$${totalPrice}`;
    checkoutModal.style.display = "block";
}

// Function to confirm purchase
function confirmPurchase() {
    alert(`Thank you for your purchase! Total: $${totalPrice}.`);
    localStorage.removeItem("cart"); // Clear cart after purchase
    cart = [];
    updateCart();
    closePopup();
}

// Function to show checkout pop-up
function checkoutPopup() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let checkoutModal = document.getElementById("checkout-popup");
    let checkoutTotal = document.getElementById("checkout-total");
    
    checkoutTotal.innerText = `$${totalPrice}`;
    checkoutModal.style.display = "block"; // Show the pop-up
}

// Function to close the pop-up when clicking "Cancel"
function closePopup() {
    document.getElementById("checkout-popup").style.display = "none"; // Hide the pop-up
}

// Load cart on page load
window.onload = updateCart;


// Load cart on page load
window.onload = updateCart;

// Function to remove items from the cart
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(`Total Purchase: $${totalPrice}. Redirecting to Checkout Page...`);
    window.location.href = "checkout.html";
}

// Load cart on page load
window.onload = updateCart;

