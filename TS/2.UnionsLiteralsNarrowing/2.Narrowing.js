"use strict";
// Exercise 1: Narrowing with if Statements
function validateUsername(username) {
    if (typeof username === "string") {
        console.log(username.length > 5);
        return true;
    }
    return false;
}
// Exercise 2: Throwing Errors to Narrow
const appElement = document.getElementById('app');
if (!appElement) {
    throw new Error('Could not find app element');
}
const handleResponse = (response) => {
    // How do we check if 'data' is in the response?
    if ('data' in response) {
        return response.data.id;
    }
    else {
        throw new Error(response.error);
    }
};
