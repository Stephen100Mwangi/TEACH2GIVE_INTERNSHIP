"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatenate = concatenate;
// Exercise 1: Optional Functional Parameters
const concat_Name2 = (first, last) => {
    if (!last) {
        return first;
    }
    return `${first} ${last}`;
};
const result = concat_Name2("John", "Doe");
const result2 = concat_Name2("John");
// Exercise 2: Default Functional Parameters
const concat_Name = (first, last) => {
    if (!last) {
        last = "Pocock";
        return first;
    }
    return `${first} ${last}`;
};
//Exercise 3:Rest parameters
function concatenate(...strings) {
    return strings.join("");
}
const modifyUser = (user, id, makeChange) => {
    return user.map((u) => {
        if (u.id === id) {
            return makeChange(u);
        }
        return u;
    });
};
const users = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
];
modifyUser(users, "1", (user) => {
    return { ...user, name: "Waqas" };
});
// Question 5: Functions Returning void
const addClickEventListener = (listener) => {
    document.addEventListener("click", listener);
};
// Question 6: void vs undefined
const acceptsCallback = (callback) => {
    callback();
};
// Question 7: Typing Async Functions
async function fetchData() {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
}
