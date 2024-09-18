//filterAndSort

function filterAndSort (filterFunc, ...numbers) {
  return numbers.filter (filterFunc).sort ((a, b) => a - b);
}

const isEven = num => num % 2 === 0;

console.log (filterAndSort (isEven, 7, 9, 7, 3, 4, 5, 1, 2, 3, 9));

// mergeObjects Function
function mergeObjects (...objects) {
  const reducedObjects = objects.reduce (callBack, {});
  function callBack (accumulator, value) {
    return {...accumulator, ...value};
  }
  return reducedObjects;
}
const object1 = {
  a: 1,
  b: 2,
};
const object2 = {
  c: 3,
  d: 4,
};
const object3 = {
  a: 3,
  d: 4,
};

console.log (mergeObjects (object1, object2, object3));

// combineArrays
function combineArrays (...arrays) {
  return arrays.filter ((value, index, ...arrays) => {
    return arrays.indexOf (value) === index;
  });
}

const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const arr3 = [5, 6, 7];

console.log (combineArrays (arr1, arr2, arr3));

// extractProperties;

function extractProperties (objects, ...properties) {
  // Map over the objects
  return objects.map (objectItem => {
    return properties.reduce ((object, key) => {
      if (objectItem.hasOwnProperty (key)) {
        object[key] = objectItem[key];
      }
      return object;
    }, {});
  });
}

// Test case
const objects = [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}];
console.log (extractProperties (objects, 'a', 'c'));
// Output: [{ a: 1, c: 3 }, { a: 4, c: 6 }]

