console.log (
  "\n 9. Write a JavaScript function to retrieve all the names of an object's own and inherited properties."
);

function getAllProperties (obj) {
  let properties = [];
  for (const prop in obj) {
    properties.push (prop);
  }

  // Convert into a set then into an array and remove duplicates
  return Array.from (new Set (properties));
}

class Person {
  constructor (name) {
    this.name = name;
  }
}

Person.prototype.age = 30;
const Person001 = new Person ('John'); // Person001 has a property name and age property inherited from Person.prototype
console.log (getAllProperties (Person001));
