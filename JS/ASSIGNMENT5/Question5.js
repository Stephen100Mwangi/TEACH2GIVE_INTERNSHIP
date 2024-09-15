// 5. Write a JavaScript program that returns a subset of a string.
// Sample Data: dog
// Expected Output: ["d", "do", "dog", "o", "og", "g"]

console.log (
  '\n Number 5 Write a JavaScript program that returns a subset of a string. '
);

let word = 'dog';
let substrings = []; // My initial array is empty
let sub = ''; // Current substring is empty

// Loop through the word while incrementing the start and and end index.
for (let i = 0; i < word.length; i++) {
  for (let j = i + 1; j <= word.length; j++) {
    sub = word.substring (i, j);
    substrings.push (sub);
  }
}

console.log (substrings);
