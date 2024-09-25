"use strict";
const userMap = new Map();
userMap.set(1, { name: "Max", age: 30 });
userMap.set(2, { name: "Manuel", age: 31 });
userMap.set(3, { name: "Anna", age: 29 });
userMap.set(3, { name: "Joan", age: 20 });
// Exercise 2
const parsedData = JSON.parse('{"name": "Alice", "age": 30}');
