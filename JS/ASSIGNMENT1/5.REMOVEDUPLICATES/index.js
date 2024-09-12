// 5. Remove Duplicates from a String
// Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.
console.log ('\n 5. Remove Duplicates from a String');
function removeDuplicates (sentence) {
  // Change into an array
  const array_sentence = sentence.split ('');

  // Use filter to remove duplicates
  return array_sentence
    .filter ((char, index) => {
      return array_sentence.indexOf (char) === index;
    })
    .join (''); // Join the array back into a string
}

console.log (removeDuplicates ('programming')); // Output: 'progamin'
console.log (removeDuplicates ('abcd')); // Output: 'abcd'
console.log (removeDuplicates ('aaaa')); // Output: 'a'
console.log (removeDuplicates ('aabbcc')); // Output: 'abc'
console.log (removeDuplicates ('hello world')); // Output: 'helo wrld'
console.log ('**************************************************');
