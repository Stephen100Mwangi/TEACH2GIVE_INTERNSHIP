// 8. Case Insensitive Palindrome
// Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
console.log ('\n 8. Case Insensitive Palindrome');

function isCaseInsensitivePalindrome (str) {
  // Convert the string to lowercase and remove non-alphanumeric characters
  const cleanedStr = str.toLowerCase ().replace (/[^a-z0-9]/g, '');

  // Reverse the cleaned string
  const reversedStr = cleanedStr.split ('').reverse ().join ('');

  // Check if the original and reversed strings are equal
  return cleanedStr === reversedStr;
}

// Test cases
console.log (isCaseInsensitivePalindrome ('Aba')); // Output: true
console.log (isCaseInsensitivePalindrome ('Racecar')); // Output: true
console.log (isCaseInsensitivePalindrome ('Palindrome')); // Output: false
console.log (isCaseInsensitivePalindrome ('Madam')); // Output: true
console.log (isCaseInsensitivePalindrome ('Hello')); // Output: false
