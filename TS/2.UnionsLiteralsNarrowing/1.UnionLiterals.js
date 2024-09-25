"use strict";
//Exercise 1: string or null
function getUsername(username) {
    if (username !== null) {
        return `User: ${username}`;
    }
    else {
        return 'Guest';
    }
}
const result = getUsername('Alice');
const result2 = getUsername(null);
function move(direction, distance) {
    // Move the specified distance in the given direction
}
