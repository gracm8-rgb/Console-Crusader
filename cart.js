const CART_KEY = 'consoleCrusaderCart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${item.name} has been added to your cart.`);
}

function updateItemQuantity(index, quantity) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity = quantity;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  saveCart(cart);
}

function removeItemFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const countElement = document.getElementById('cart-count-nav');
  if (countElement) {
    countElement.textContent = count;
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}