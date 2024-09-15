function objectToPairs (obj) {
  return Object.entries (obj);
}

// Example usage:
const exampleObj = {name: 'John', age: 30, city: 'New York'};
console.log (objectToPairs (exampleObj));
// Output: [["name", "John"], ["age", 30], ["city", "New York"]]
