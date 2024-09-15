console.log ('\n 8. Write a JavaScript function to parse an URL.');

function parseURL (url) {
  // Create a new URL object
  let parsed = new URL (url);

  // Return an object with the various parts of the URL
  return {
    href: parsed.href, // Full URL
    protocol: parsed.protocol, // Protocol (e.g., http:, https:)
    hostname: parsed.hostname, // Hostname (e.g., www.example.com)
    port: parsed.port, // Port (e.g., 80, 443)
    pathname: parsed.pathname, // Pathname (e.g., /path/to/resource)
    search: parsed.search, // Query string (e.g., ?id=123)
    hash: parsed.hash, // Hash (e.g., #section)
    host: parsed.host, // Host (hostname:port)
    origin: parsed.origin, // Origin (protocol + host)
  };
}

// Test the function
const url = 'https://www.example.com:8080/path/to/resource?name=value#section';
console.log (parseURL (url));
