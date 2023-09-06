let cart = []

function incrementCounter(btn) {
  const input = btn.parentNode.parentNode.querySelector('input');
  input.value = parseInt(input.value) + 1;
}

function decrementCounter(btn) {
  const input = btn.parentNode.parentNode.querySelector('input');
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}

async function addToTable(btn, dish) {
  let user = JSON.parse(localStorage.getItem("user"))
  const input = btn.parentNode.querySelector('input');
  const quantity = parseInt(input.value);
  if (quantity > 0) {

    alert("Added to cart: " + quantity + " item(s)");
  }
  const existingDish = cart.find(item => item._id === dish._id);
  if (existingDish) {

    try {
      const response = await fetch("http://localhost:4000/cart/update", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: user.token,
          userId: user._id,
          dishId: dish._id,
          quantity: existingDish.quantity + quantity
        })
      });

    } catch (error) {
      console.log(error)
    }
  } else {
    dish.quantity = quantity;
    cart.push(dish);

    try {
      const response = await fetch("http://localhost:4000/cart/addToCart", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: user.token,
          userId: user._id,
          dishId: dish._id,
          quantity: quantity
        })
      });
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

}

async function getDishes() {
  try {
    const response = await fetch("http://localhost:4000");
    const result = await response.json();
    console.log(result)
    result.forEach(element => {
      drawDish(element)
    });
  } catch (error) {
    console.log(error)
  }
}

function drawDish(dish) {
  const div = document.createElement('div');
  div.className = "card";
  div.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${dish.name}</h5>
      <p class="card-text">${dish.description}</p>
      <p class="card-text">Price: $${dish.price}</p>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" onclick="decrementCounter(this)">-</button>
        </div>
        <input type="text" class="form-control text-center" value="0" readonly>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onclick="incrementCounter(this)">+</button>
        </div>
      </div>
      </div>
      `
  let button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.innerText = "Add to Cart";
  button.addEventListener("click", (e) => {
    addToTable(e.target, dish)
  })
  div.append(button)
  let container = document.getElementById("container")
  container.append(div)
}



window.addEventListener("load", async () => {
  getDishes()
  let user = JSON.parse(localStorage.getItem("user"))
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