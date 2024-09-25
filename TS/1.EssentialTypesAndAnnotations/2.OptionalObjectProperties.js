"use strict";
// Exercise 1: Object Literal Types
const concatName = (user) => {
    return `${user.first} ${user.last}`;
};
// Example 2:Optimal Property Types
const concatName2 = (user) => {
    if (!user.last) {
        return user.first;
    }
    return `${user.first} ${user.last}`;
};
