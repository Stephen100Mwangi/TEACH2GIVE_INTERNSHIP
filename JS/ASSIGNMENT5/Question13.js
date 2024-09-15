function hasProperty (obj, property) {
  return obj.hasOwnProperty (property);
}

// Example usage:
const exampleObj3 = {name: 'John', age: 30, city: 'New York'};
console.log (hasProperty (exampleObj3, 'age')); // Output: true
console.log (hasProperty (exampleObj3, 'country')); // Output: false
