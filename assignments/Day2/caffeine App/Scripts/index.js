//add your js code here
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = storedCart.length.toString();
  }
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
  });
  