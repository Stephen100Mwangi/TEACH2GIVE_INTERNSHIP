const listContainer = document.querySelector('.listContainer');
const fetchButton = document.querySelector('#fetchButton');
const filterSelect = document.querySelector('#filterSelect');
const searchInput = document.querySelector('.setFilter');
let filteredData = [];
let originalData = [];
let favoriteItems = [];

// Event Listener for Fetch Button
fetchButton.addEventListener('click', fetchData);

// Fetch Data from Backend
async function fetchData() {
  try {
    const response = await fetch('http://localhost:8085/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      originalData = [...data];
      filteredData = [...data];
      displayProducts(filteredData); // Display all products initially
    } else {
      alert('No products found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch products. Please try again later.');
  }
}

// Display Products on Frontend
function displayProducts(products) {
  // Clear the previous content in the container before rendering new results
  listContainer.innerHTML = '';

  products.forEach(product => {
    const elementListItem = document.createElement('div');
    elementListItem.classList.add('card'); // Corrected class addition

    // Product Image
    const elementImage = document.createElement('img');
    elementImage.src = product.imageUrl;
    elementImage.alt = product.title;
    elementImage.classList.add('image');

    // Product Details Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('contentWrapper');

    // Product ID
    const elementId = document.createElement('div');
    elementId.textContent = `ID: ${product.id}`;
    elementId.classList.add('id');

    // Product Title
    const elementTitle = document.createElement('div');
    elementTitle.textContent = `Title: ${product.title}`;
    elementTitle.classList.add('title');

    // Product Company
    const elementCompany = document.createElement('div');
    elementCompany.textContent = `Company: ${product.company}`;
    elementCompany.classList.add('company');

    // Product Date
    const elementDate = document.createElement('div');
    elementDate.textContent = `Date: ${product.date}`;
    elementDate.classList.add('date');

    // Product Price
    const elementPrice = document.createElement('div');
    elementPrice.textContent = `Price: $${product.price}`;
    elementPrice.classList.add('price');

    // Product Location
    const elementLocation = document.createElement('div');
    elementLocation.textContent = `Location: ${product.location}`;
    elementLocation.classList.add('location');

    // Action Buttons Wrapper
    const actionButtonsWrapper = document.createElement('div');
    actionButtonsWrapper.classList.add('actionButtonsWrapper');
    actionButtonsWrapper.style.marginTop = '10px';
    actionButtonsWrapper.style.display = 'flex';
    actionButtonsWrapper.style.gap = '10px';

    // View Button
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View 👁';
    viewButton.classList.add('viewButton');
    viewButton.addEventListener('click', () => viewProduct(product));

    // Update Button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update ✏️';
    updateButton.classList.add('updateButton');
    updateButton.addEventListener('click', () => updateProduct(product));

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete 🗑️';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => deleteProduct(product.id, elementListItem));

    // Append Action Buttons
    actionButtonsWrapper.append(viewButton, updateButton, deleteButton);

    // Buy Button
    const elementButton = document.createElement('button');
    elementButton.classList.add('buyButton');
    elementButton.textContent = 'Buy Now';
    elementButton.addEventListener('click', () => {
      alert(`You have purchased "${product.title}" for $${product.price}!`);
    });

    // Favorite Button
    const favButton = document.createElement('div');
    favButton.textContent = favoriteItems.includes(product.id) ? '❤️' : '🤍';
    favButton.classList.add('favButton');
    favButton.style.cursor = 'pointer';
    favButton.addEventListener('click', () => toggleFavorite(product.id, favButton));

    // Append All Elements to Content Wrapper
    contentWrapper.append(elementId, elementTitle, elementCompany, elementLocation, elementDate, elementPrice, actionButtonsWrapper, elementButton);

    // Append Elements to List Item
    elementListItem.append(elementImage, contentWrapper, favButton);

    // Append List Item to Container
    listContainer.append(elementListItem);
  });
}

// Toggle Favorite Status
function toggleFavorite(id, button) {
  if (favoriteItems.includes(id)) {
    favoriteItems = favoriteItems.filter(itemId => itemId !== id);
    button.textContent = '🤍';
  } else {
    favoriteItems.push(id);
    button.textContent = '❤️';
  }
}

// View Product Details
function viewProduct(product) {
  const productDetails = `
    ID: ${product.id}
    Title: ${product.title}
    Company: ${product.company}
    Location: ${product.location}
    Date: ${product.date}
    Price: $${product.price}
    Image URL: ${product.imageUrl}
  `;
  alert(productDetails);
}

// Delete Product
async function deleteProduct(id, elementListItem) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:8085/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);

      // Remove the product from the UI
      elementListItem.remove();

      // Update local data
      originalData = originalData.filter(item => item.id !== id);
      filteredData = filteredData.filter(item => item.id !== id);
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to delete the product.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('An error occurred while deleting the product.');
  }
}

// Update Product
function updateProduct(product) {
  // Prompt the user for new values
  const newTitle = prompt('Enter new title:', product.title);
  if (newTitle === null) return; // User cancelled

  const newPrice = prompt('Enter new price:', product.price);
  if (newPrice === null) return; // User cancelled

  const newDate = prompt('Enter new date (e.g., 2024-12-31):', product.date);
  if (newDate === null) return; // User cancelled

  const newLocation = prompt('Enter new location:', product.location);
  if (newLocation === null) return; // User cancelled

  const newCompany = prompt('Enter new company:', product.company);
  if (newCompany === null) return; // User cancelled

  const newImageUrl = prompt('Enter new image URL:', product.imageUrl);
  if (newImageUrl === null) return; // User cancelled

  // Validate inputs
  if (!newTitle || !newPrice || isNaN(newPrice) || !newDate || !newLocation || !newCompany || !newImageUrl) {
    alert('Invalid input. Please ensure all fields are correctly filled.');
    return;
  }

  // Create the updated product object
  const updatedProduct = {
    title: newTitle.trim(),
    price: parseFloat(newPrice),
    date: newDate.trim(),
    location: newLocation.trim(),
    company: newCompany.trim(),
    imageUrl: newImageUrl.trim()
  };

  // Send the update to the backend
  sendUpdateRequest(product.id, updatedProduct);
}

// Send Update Request to Backend
async function sendUpdateRequest(id, updatedProduct) {
  try {
    const response = await fetch(`http://localhost:8085/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);

      // Update local data
      const index = originalData.findIndex(item => item.id === id);
      if (index !== -1) {
        originalData[index] = result.product;
        filterProducts(); // Re-apply current filters
      }
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to update the product.');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    alert('An error occurred while updating the product.');
  }
}

// Filter Products
function filterProducts() {
  const filterParam = filterSelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!filterParam || !searchTerm) {
    filteredData = [...originalData]; // Reset to original data if no filter/search term
  } else {
    filteredData = originalData.filter(item => {
      const field = item[filterParam]?.toString().toLowerCase(); // Get field based on filter type
      return field && field.includes(searchTerm);
    });
  }

  displayProducts(filteredData); // Update the UI with filtered products
}

// Add event listeners for filtering
filterSelect.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);