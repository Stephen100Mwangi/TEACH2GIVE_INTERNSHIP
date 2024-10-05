// backend/server.js
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to products.json
const productsFilePath = path.join(__dirname, 'products.json');

// Utility Functions
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data).products;
};

const writeProducts = (products) => {
  const data = JSON.stringify({ products }, null, 2);
  fs.writeFileSync(productsFilePath, data, 'utf-8');
};

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// Server Logic
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle Preflight Requests
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /products - Fetch all products
  if (pathname === '/products' && method === 'GET') {
    try {
      const products = readProducts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(products));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
    return;
  }

  // GET /products/:id - Fetch a product by ID
  if (/^\/products\/\d+$/.test(pathname) && method === 'GET') {
    const id = parseInt(pathname.split('/')[2]);
    try {
      const products = readProducts();
      const product = products.find(p => p.id === id);
      if (product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
    return;
  }

  // DELETE /products/:id - Delete a product by ID
  if (/^\/products\/\d+$/.test(pathname) && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[2]);
    try {
      let products = readProducts();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        writeProducts(products);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Product with ID ${id} deleted successfully` }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
    return;
  }

  // PUT /products/:id - Update a product by ID
  if (/^\/products\/\d+$/.test(pathname) && method === 'PUT') {
    const id = parseInt(pathname.split('/')[2]);
    try {
      const updatedFields = await getRequestBody(req);
      let products = readProducts();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        writeProducts(products);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product updated successfully', product: products[index] }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON data' }));
    }
    return;
  }

  // POST /products - Create a new product
  if (pathname === '/products' && method === 'POST') {
    try {
      const newProduct = await getRequestBody(req);
      let products = readProducts();
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const productToAdd = { id: newId, ...newProduct };
      products.push(productToAdd);
      writeProducts(products);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product created successfully', product: productToAdd }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid JSON data' }));
    }
    return;
  }

  // Fallback Route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

// Start the Server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
