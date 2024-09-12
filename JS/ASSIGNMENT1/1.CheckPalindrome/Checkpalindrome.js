// 1. Check if a String is a Palindrome
// Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
// Palindrome is spelt the same way on both sides
console.log ('\n1. Check if a String is a Palindrome');
function isPalindrome (str) {
  // Convert the string to lowercase and remove non-alphanumeric characters
  const cleanedStr = str.toLowerCase ().replace (/[^a-z0-9]/g, '');

  // Reverse the cleaned string
  const reversedStr = cleanedStr.split ('').reverse ().join ('');

  // Check if the original and reversed strings are equal
  return cleanedStr === reversedStr;
}

// Test cases
console.log (isPalindrome ('Hello')); // false
console.log (isPalindrome ('mum')); // true
console.log (isPalindrome ('Was it a car or a cat I saw')); // true
console.log (isPalindrome ('A man, a plan, a canal, panama')); // true
console.log ('**************************************************');
