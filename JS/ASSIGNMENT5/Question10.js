console.log (
  "\n Question 9 Write a JavaScript function to retrieve all the values of an object's properties."
);

function getAllPropertyValues (obj) {
  let values = [];

  for (const prop in obj) {
    values.push (prop);
  }

  return values;
}

function Student (name) {
  this.name = name;
}

class Student {
  constructor (name) {
    name = this.name;
  }
}

Person.prototype.age = 30;

let john = new Person ('John');

console.log (getAllPropertyValues (Person001));
