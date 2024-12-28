
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click",() => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click",() => {
    document.body.classList.toggle("show-mobile-menu");
});



document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', function() {
      const menuItem = this.closest('.menu-item');
      const itemName = menuItem.getAttribute('data-name');
      const itemPrice = parseFloat(menuItem.getAttribute('data-price'));
      const itemImage = menuItem.getAttribute('data-image');
      
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Check if the item is already in the cart
      const existingItem = cartItems.find(item => item.name === itemName);
      
      if (existingItem) {
          // Increment quantity if item is already in the cart
          existingItem.quantity += 1;
      } else {
          // Add new item with quantity 1
          cartItems.push({
              name: itemName,
              price: itemPrice,
              image: itemImage,
              quantity: 1
          });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Update total price and navigate to cart
      updateCart();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  updateCart();
});

function updateCart() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsList = document.getElementById('cart-items-list');
  const totalPriceElement = document.getElementById('total-price');
  let totalPrice = 0;

  cartItemsList.innerHTML = ''; // Clear the cart list

  cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('cart-item');
      listItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <span>${item.name} - $${item.price} x <span class="item-quantity">${item.quantity}</span></span>
          <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-item-btn">Remove</button>
          <button class="increment-btn">+</button>
          <button class="decrement-btn">-</button>
      `;

      // Add price to total
      totalPrice += item.price * item.quantity;

      cartItemsList.appendChild(listItem);

      // Increment quantity
      listItem.querySelector('.increment-btn').addEventListener('click', function() {
          item.quantity += 1;
          localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
          updateCart();
      });

      // Decrement quantity
      listItem.querySelector('.decrement-btn').addEventListener('click', function() {
          if (item.quantity > 1) {
              item.quantity -= 1;
              localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
              updateCart();
          }
      });

      // Remove item from cart
      listItem.querySelector('.remove-item-btn').addEventListener('click', function() {
          cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
          localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
          updateCart();
      });
  });

  // Display total price
  totalPriceElement.textContent = totalPrice.toFixed(2);
}


// Script to handle navigation to the checkout page
document.getElementById("checkout-button").addEventListener("click", function () {
  window.location.href = "checkout.html"; // Redirect to the checkout page
});


//Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
    spaceBetween: 25,
    loop: true,
    grabCursor: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets:true,
    
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: { // Corrected typo here
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
    
});
