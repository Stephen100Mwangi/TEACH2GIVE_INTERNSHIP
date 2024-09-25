"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example5 = exports.example4 = exports.example3 = exports.example2 = exports.example1 = exports.add = void 0;
// Example 1
const add = (a, b) => {
    return a + b;
};
exports.add = add;
const result = (0, exports.add)(2, 5);
console.log(result);
// Example 2
const concatTwoStrings = (a, b) => {
    return [a, b].join(" ");
};
const result2 = concatTwoStrings("Hello", "World");
//Example3
exports.example1 = "Hello World!";
exports.example2 = 42;
exports.example3 = true;
exports.example4 = Symbol();
exports.example5 = 123n;
//Example 4
const handleFormData = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    return value;
};
