console.log (
  '\n 7. Write a JavaScript function to print all the methods in a JavaScript object.'
);

// 11. Write a JavaScript function to print all the methods in a JavaScript object.
// Test Data :
// console.log(all_properties(Array));
// ["length", "name", "arguments", "caller", "prototype", "isArray", "observe", "unobserve"]

function all_properties (obj) {
  return Object.getOwnPropertyNames (obj).filter (function (property) {
    return typeof (obj[property] === 'function');
  });
}

console.log (all_properties (Array));
