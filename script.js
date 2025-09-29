// Store cart in localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(name, price) {
    let cart = getCart();
    let existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart(cart);
    alert(name + " added to cart!");
  }
  
  // Render cart table
  function renderCart() {
    let cart = getCart();
    let tbody = document.querySelector("#cartTable tbody");
    if (!tbody) return;
  
    tbody.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      let row = document.createElement("tr");
      let itemTotal = item.price * item.qty;
      total += itemTotal;
  
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>${itemTotal}</td>
        <td><button onclick="removeItem(${index})">❌</button></td>
      `;
      tbody.appendChild(row);
    });
    document.getElementById("cartTotal").textContent = "Total "+total;
  }
  
  function changeQty(index, delta) {
    let cart = getCart();
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
  
  function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
  
  function checkout() {
    alert("Thank you for your purchase 🎉");
    localStorage.removeItem("cart");
    renderCart();
  }
  
  // Run renderCart if on cart page
  window.onload = renderCart;
  