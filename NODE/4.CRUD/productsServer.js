// 1.Create a server - We will be using http module

import http from 'http';
const fs = require ('fs');

const server = http.createServer ();
const PORT = 8085;

const getProducts = () => {
  fs.readFileSync ('productsData.json', 'utf-8');
  return JSON.parse (data).products;
};
