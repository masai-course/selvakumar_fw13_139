let cartData = JSON.parse(localStorage.getItem("cart")) || [];

function calculateTotalAmount() {
  let total = 0;
  for (const item of cartData) {
    total += item.discountedPrice;
  }
  return total;
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = storedCart.length.toString();
}

function updateUI() {
  const totalItems = document.getElementById("totalItems");
  const totalAmount = document.getElementById("totalAmount");

  totalItems.textContent = "Total items in cart: " + cartData.length;
  totalAmount.textContent = "Total Amount: $" + calculateTotalAmount().toFixed(2);
}

function updateBillAmount() {
  const billAmount = document.getElementById("billAmount");
  billAmount.textContent = "Bill Amount: $" + calculateTotalAmount().toFixed(2);
}

function removeFromCart(index) {
  const removedItem = cartData.splice(index, 1)[0];
  updateCartCount();
  updateUI();
  updateBillAmount();
  localStorage.setItem("cart", JSON.stringify(cartData));
  const cartItem = document.getElementById("cartItem-" + removedItem.id);
  if (cartItem) {
    cartItem.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  for (let i = 0; i < cartData.length; i++) {
    const item = cartData[i];
    const cartItemDiv = document.createElement("div");
    cartItemDiv.id = "cartItem-" + item.id;
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="item-details">
        <p class="item-name">${item.name}</p>
        <p class="item-price">$${item.discountedPrice.toFixed(2)}</p>
        <button class="removeCartItem" data-index="${i}">Remove from Cart</button>
      </div>
    `;
    cartContainer.appendChild(cartItemDiv);
  }

  updateUI();

  const applyCouponButton = document.getElementById("applyCouponButton");
  applyCouponButton.addEventListener("click", () => {
    const couponInput = document.getElementById("couponInput");
    const enteredCoupon = couponInput.value.trim().toLowerCase();
    const validCoupon = "masai15";

    if (enteredCoupon === validCoupon) {
      const discountPercentage = 15;
      const discountedAmount = (calculateTotalAmount() * discountPercentage) / 100;
      const discountedTotal = calculateTotalAmount() - discountedAmount;
      const billAmount = document.getElementById("billAmount");
      billAmount.textContent = "Bill Amount: $" + discountedTotal.toFixed(2);
    } else {
      alert("Invalid coupon code. Please enter a valid coupon code.");
    }
  });

  cartContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeCartItem")) {
      const indexToRemove = parseInt(event.target.dataset.index, 10);
      removeFromCart(indexToRemove);
    }
  });

  updateCartCount();
});
