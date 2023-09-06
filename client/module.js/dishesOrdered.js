// Function to remove a dish from the cart
function removeFromCart(dish) {
  const index = cart.findIndex(item => item._id === dish._id);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(cart);
  }
}

// Function to increase the quantity of a dish
function increaseQuantity(dish) {

  const index = cart.indexOf(dish)
  if (index !== -1) {
    dish.quantity += 1;
    console.log(dish);
    cart[index] = dish;
    console.log(cart);
    displayCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// Function to decrease the quantity of a dish
function decreaseQuantity(dish) {
  const index = cart.indexOf(dish);
  if (index !== -1) {
    if (dish.quantity > 1) {
      dish.quantity -= 1;
      console.log(dish);
      cart[index] = dish;
      console.log(cart);
      displayCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      removeFromCart(dish);
    }
  }
}

function displayCart() {

  console.log(cart);
  // Get the cart container element
  const cartContainer = document.getElementById('cartContainer');

  // Clear the cart container
  cartContainer.innerHTML = '';

  if (cart) {

    // Iterate over the dishes in the cart
    cart.forEach(dish => {
      // Create HTML elements to display dish information and the counter
      const dishElement = document.createElement('div');
      dishElement.innerHTML = `
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          <p>Price: $${dish.price}</p>
          <p>Quantity: ${dish.quantity}</p>
         
        `;

      let buttonIncrease = document.createElement("button");
      buttonIncrease.innerText = "+";
      buttonIncrease.addEventListener("click", () => {
        increaseQuantity(dish);
      })

      let buttonDecrease = document.createElement("button");
      buttonDecrease.innerText = "-";
      buttonDecrease.addEventListener("click", () => {
        decreaseQuantity(dish);
      })

      let buttonRemoveFromCart = document.createElement("button");
      buttonRemoveFromCart.innerText = "remove";
      buttonRemoveFromCart.addEventListener("click", () => {
        removeFromCart(dish);
      })
      dishElement.append(buttonIncrease, buttonDecrease, buttonRemoveFromCart)
      // Append the dish element to the cart container
      cartContainer.appendChild(dishElement);
    });
  }
}
let cart = []
window.addEventListener("load", async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await fetch("http://localhost:4000/cart", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: user.token,
        userId: user._id

      })
    });
    const result = await response.json();
    console.log(result)
    cart = result
    displayCart(cart)
  } catch (error) {
    console.log(error)
  }
})












