document.addEventListener ('DOMContentLoaded', () => {
  const fetchDataButton = document.querySelector ('#fetchDataButton');
  const productList = document.querySelector ('#productList');

  // Fetch products when button is clicked
  fetchDataButton.addEventListener ('click', () => {
    fetch ('http://localhost:8085/products')
      .then (response => {
        response.json ();
      })
      .then (products => {
        // Clear the existing product list
        productList.innerHTML = '';

        // Loop through the products and display each one
        products.forEach (product => {
          const productItem = document.createElement ('div');
          productItem.classList.add ('productList');

          const productName = document.createElement ('div');
          const productPrice = document.createElement ('div');
          const productColor = document.createElement ('div');
          const productAvailable = document.createElement ('div');

          productName.textContent = `${product.name}`;
          productPrice.textContent = `$${product.price}`;
          productColor.textContent = `${product.color}`;
          productAvailable.textContent = `${product.isAvailable ? 'Available' : 'Out of Stock'}`;

          productItem.appendChild (productName);
          productItem.appendChild (productColor);
          productItem.appendChild (productPrice);
          productItem.appendChild (productAvailable);

          productList.appendChild (productItem);
        });
      })
      .catch (error => {
        console.error ('Error fetching products:', error);
      });
  });
});
