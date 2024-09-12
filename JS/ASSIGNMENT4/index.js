import express from 'express';

const PORT = 5670;

const app = express ();

app.listen (PORT, () => {
  console.log (`App running on port http://localhost:${PORT}`);
});

app.get ('/', async (req, res) => {
  console.log ('Welcome to JSON-SERVER');
});
app.get ('/data', async (req, res) => {
  return res.status (200).json (products);
});

const fetchDataButton = document.querySelector ('#fetchDataButton');
fetchDataButton.addEventListener (
  'click',
  fetch ('http://localhost:8085/products')
    .then (productData => {
      console.log (productData);
      const product_Data = productData.json ();
    })
    .then ()
  // console.log(pr);
);

(() => {
  fetch ('http://localhost:8085/products')
    .then (response => {
      console.log (response);
      return response.json ();
    })
    .then (data => {
      console.log (data);
    });
}) ();
