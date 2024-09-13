document.addEventListener ('DOMContentLoaded', () => {
  const fetchDataButton = document.querySelector ('#fetchDataButton');
  const productList = document.querySelector ('#productList');

  // Fetch products when button is clicked
  fetchDataButton.addEventListener ('click', () => {
    fetch ('http://localhost:8085/products')
      .then (response => response.json ())
      .then (products => {
        // Clear the existing product list
        productList.innerHTML = '';

        // Loop through the products and display each one
        products.forEach (product => {
          const productItem = document.createElement ('div');
          productItem.classList.add ('productItem');

          const productName = document.createElement ('div');
          const productDescription = document.createElement ('div');
          const productPrice = document.createElement ('div');
          const productCategory = document.createElement ('div');
          const productStock = document.createElement ('div');

          productName.textContent = `Name: ${product.name}`;
          productDescription.textContent = `Description: ${product.description}`;
          productPrice.textContent = `Price: $${product.price}`;
          productCategory.textContent = `Category: ${product.category}`;
          productStock.textContent = `Stock: ${product.stock}`;

          // Append all product details to the product item
          productItem.appendChild (productName);
          productItem.appendChild (productDescription);
          productItem.appendChild (productPrice);
          productItem.appendChild (productCategory);
          productItem.appendChild (productStock);

          // Append the product item to the product list
          productList.appendChild (productItem);
        });
      })
      .catch (error => {
        console.error ('Error fetching products:', error);
      });
  });
});
