const productsBody = document.querySelector ('.productsBody');
let addedJSON_DATA = [];
let cartItems = [];

(async function addProducts () {
  await fetch ('http://localhost:8055/addedDataJSON')
    .then (response => {
      if (!response.ok) {
        console.log ('Response was NOT OK ❌');
        return;
      } else {
        console.log ('Response was OK ✅');
        return response.json ();
      }
    })
    .then (data => {
      console.log (data);
      addedJSON_DATA = [...data];
      likedProducts = [...data];

      populateProducts (data);
    });
}) ().catch (error => {
  console.log ('Error Occurred 😖');
  console.error (error.message);
});

function populateProducts (products) {
  products.forEach (dataProduct => {
    const listContainer = document.createElement ('div');

    const productId = document.createElement ('div');
    productId.textContent = dataProduct.id;
    productId.classList.add ('productId');

    const productImage = document.createElement ('img');
    productImage.src = dataProduct.imageUrl;
    productImage.classList.add ('productImage');

    const productTitle = document.createElement ('h2');
    productTitle.textContent = dataProduct.title;
    productTitle.classList.add ('productTitle');

    const productCompany = document.createElement ('h3');
    productCompany.textContent = dataProduct.company;
    productCompany.classList.add ('productCompany');

    const productDate = document.createElement ('small');
    productDate.textContent = dataProduct.date;
    productDate.classList.add ('productDate');

    const productLocation = document.createElement ('h3');
    productLocation.textContent = dataProduct.location;
    productLocation.classList.add ('productLocation');

    const productPrice = document.createElement ('h3');
    productPrice.textContent = dataProduct.price;
    productPrice.classList.add ('productPrice');

    const addToCart = document.createElement ('button');
    addToCart.textContent = 'Add to cart';
    addToCart.classList.add ('addToCart');

    addToCart.addEventListener ('click', addToCart);

    listContainer.append (productImage);
    listContainer.append (productTitle);
    listContainer.append (productCompany);
    listContainer.append (productLocation);
    listContainer.append (productDate);
    listContainer.append (productPrice);
    listContainer.append (productId);
    listContainer.append (addToCart);

    productsBody.append (listContainer);
  });
}

// Add Products to cart
function addToCart (productId) {
  const product = addedJSON_DATA.find (p => p.id === productId);

  if (product) {
    const existingItem = cart.find (x => x.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push ({...product, quantity: 1});
    }
    updateCartUI ();
  }
}

//Increase product quantity
function increaseProductQuantity (productId) {
  const item = cartItems.find (x => x.id === productId);
  if (item) {
    item.quantity += 1;
    updateCartUI ();
  }
}

// Reduce product quantity
function reduceProductQuantity (productId) {
  const item = cartItems.find (x => x.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity === 0) {
      deleteProductFromCart (productId);
    } else {
      updateCartUI ();
    }
  }
}

// Delete product
function deleteProductFromCart (productId) {
  cartItems = cartItems.filter (x => x.id !== productId);
  updateCartUI ();
}

// Edit Product in Cart
function editProductInCart (productId, newQuantity) {
  const item = cartItems.find (item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    if (item.quantity <= 0) {
      deleteProductFromCart (productId);
    } else {
      updateCartUI ();
    }
  }
}

//Update cart UI
function updateCartUI () {
  const cartContainer = document.querySelector ('.cartContainer');
  cartContainer.innerHTML = '';

  cartItems.forEach (item => {
    const cartItemElement = document.createElement ('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="increase">+</button>
            <button class="decrease">-</button>
            <button class="remove">Remove</button>
        `;
    cartItemElement
      .querySelector ('.increase')
      .addEventListener ('click', () => increaseProductQuantity (item.id));
    cartItemElement
      .querySelector ('.decrease')
      .addEventListener ('click', () => reduceProductQuantity (item.id));
    cartItemElement
      .querySelector ('.remove')
      .addEventListener ('click', () => deleteProductFromCart (item.id));

    cartContainer.appendChild (cartItemElement);
  });

  const total = cartItems.reduce (findTotal, 0);
  function findTotal (acc, val, index, array) {
    return acc + val.price * val.quantity;
  }
  const totalElement = document.createElement ('div');
  totalElement.innerHTML = `<h3>Total: $${total.toFixed (2)}</h3>`;
  cartContainer.appendChild (totalElement);
}
