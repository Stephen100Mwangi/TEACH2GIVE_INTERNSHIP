const listContainer = document.querySelector('.listContainer');
const fetchButton = document.querySelector('#fetchButton');
let filteredData = [];
let originalData = [];
let favoriteItems = [];

fetchButton.addEventListener('click', fetchData);

async function fetchData() {
  const response = await fetch('http://localhost:8085/products');
  const data = await response.json();

  if (data && data.length > 0) {
    originalData = [...data];
    filteredData = [...data];

    displayProducts(filteredData); // Display all products initially
  }
}

function displayProducts(products) {
  // Clear the previous content in the container before rendering new results
  listContainer.innerHTML = '';

  products.forEach(product => {
    const elementListItem = document.createElement('div');

    const elementId = document.createElement('div');
    const elementTitle = document.createElement('div');
    const elementCompany = document.createElement('div');
    const elementImage = document.createElement('img');
    const elementDate = document.createElement('div');
    const elementPrice = document.createElement('div');
    const elementLocation = document.createElement('div');
    const elementButton = document.createElement('button');
    const favButton = document.createElement('div')
    favButton.textContent='🤍'
    favButton.classList.add("favButton")
    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add("contentWrapper");
    
    elementButton.classList.add('buyButton');
    elementButton.textContent = 'Buy Now';

    elementId.textContent = product.id;
    elementId.classList.add('id');

    elementTitle.textContent = product.title;
    elementTitle.classList.add('title');

    elementCompany.textContent = product.company;
    elementCompany.classList.add('company');

    elementImage.src = product.imageUrl;
    elementImage.classList.add('image');

    elementDate.textContent = product.date;
    elementDate.classList.add('date');

    elementPrice.textContent = product.price;
    elementPrice.classList.add('price');

    elementLocation.textContent = product.location;
    elementLocation.classList.add('location');

    elementListItem.append(elementId);
    elementListItem.append(elementImage);

    contentWrapper.append(elementTitle)
    contentWrapper.append(elementTitle);
    contentWrapper.append(elementCompany);
    contentWrapper.append(elementDate);
    contentWrapper.append(elementPrice);
    contentWrapper.append(elementLocation);

    elementListItem.append(contentWrapper)
    elementListItem.append(elementButton);
    elementListItem.append(favButton)

    elementListItem.classList.add('card'); // Corrected class addition

    listContainer.append(elementListItem);
  });
}

function filterProducts() {
  const filterParam = document.querySelector('select').value;
  const searchTerm = document.querySelector('.setFilter').value.trim().toLowerCase();

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
document.querySelector('select').addEventListener('change', () => {
  filterProducts(); // Call filter function when filter type changes
});

document.querySelector('.setFilter').addEventListener('input', () => {
  filterProducts(); // Call filter function when user types input
});

function addToFavorite(){

}
