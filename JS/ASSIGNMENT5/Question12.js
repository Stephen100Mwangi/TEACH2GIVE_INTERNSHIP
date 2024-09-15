function invertObject (obj) {
  const invertedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty (key)) {
      invertedObj[obj[key]] = key;
    }
  }
  return invertedObj;
}

// Example usage:
const exampleObj2 = {name: 'John', age: 30, city: 'New York'};
console.log (invertObject (exampleObj2));
// Output: { "John": "name", "30": "age", "New York": "city" }
