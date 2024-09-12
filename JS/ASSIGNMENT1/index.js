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

// 2. Reverse a String
// Write a function to reverse a given string.
console.log ('\n 2. Reverse a String \n');
function reverseString (arg) {
  console.log (arg.split ('').reverse ().join (''));
  return;
}

reverseString ('Good Morning');
console.log ('**************************************************');

// 3. Find the Longest Palindromic Substring
// Write a function to find the longest palindromic substring in a given string.
console.log ('\n 3. Find the Longest Palindromic Substring');
function findLongestPalindrome (string) {
  let longestPalindrome = '';

  // Check even-length palindromes
  for (let i = 0; i < string.length - 1; i++) {
    let left = i;
    let right = i + 1;
    while (
      left >= 0 &&
      right < string.length &&
      string[left] === string[right]
    ) {
      const palindrome = string.substring (left, right + 1);
      if (palindrome.length > longestPalindrome.length) {
        longestPalindrome = palindrome;
      }
      left--;
      right++;
    }
  }

  // Check odd-length palindromes
  for (let i = 0; i < string.length; i++) {
    let left = i - 1;
    let right = i + 1;
    while (
      left >= 0 &&
      right < string.length &&
      string[left] === string[right]
    ) {
      const palindrome = string.substring (left, right + 1);
      if (palindrome.length > longestPalindrome.length) {
        longestPalindrome = palindrome;
      }
      left--;
      right++;
    }
  }

  return longestPalindrome;
}

// Test Cases
console.log (findLongestPalindrome ('babad')); // Output: 'bab' or 'aba'
console.log (findLongestPalindrome ('cbbd')); // Output:'bb'
console.log ('**************************************************');

// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.
console.log ('\n 4. Check if Two Strings are Anagrams');
function checkAnagram (a, b) {
  if (a.length !== b.length) {
    console.log (`${a} and ${b} are not anagrams- Different lengths`);
    return false;
  }

  const sortedA = a.split ('').sort ();
  const sortedB = b.split ('').sort ();

  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) {
      console.log (`${a} and ${b} are not anagrams`);
      return false;
    }
  }

  console.log (`${a} and ${b} are anagrams`);
  return true;
}

checkAnagram ('silent', 'listen');
checkAnagram ('Hello', 'World');
console.log ('**************************************************');

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

// 6. Count Palindromes in a String
// Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
console.log ('\n 6. Count Palindromes in a String');
function countPalindromes (string) {
  let count = 0;
  const n = string.length;

  // Check even-length palindromes
  for (let i = 0; i < n - 1; i++) {
    let left = i;
    let right = i + 1;
    while (left >= 0 && right < n && string[left] === string[right]) {
      count++;
      left--;
      right++;
    }
  }

  // Check odd-length palindromes
  for (let i = 0; i < n; i++) {
    let left = i - 1;
    let right = i + 1;
    while (left >= 0 && right < n && string[left] === string[right]) {
      count++;
      left--;
      right++;
    }
  }

  return count;
}

// Example usage:
console.log (countPalindromes ('ababa')); // Output: 7
console.log (countPalindromes ('racecar')); // Output: 7
console.log (countPalindromes ('aabb')); // Output: 4
console.log (countPalindromes ('a')); // Output: 1
console.log (countPalindromes ('abc')); // Output: 3
console.log ('**************************************************');

// 7. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.
console.log ('\n 7. Longest Common Prefix');
function longestCommonPrefix (strs) {
  // Parameter is an array
  if (strs.length === 0) {
    console.log ('Empty array');
  }

  let prefix = strs[0];

  // Compare first string with other strings in the array
  for (let i = 1; i < strs.length; i++) {
    const otherString = strs[i];
    while (strs[i].indexOf (prefix) !== 0) {
      // Index will be equal to 0 if prefix does not occur in subsequent strings
      prefix = prefix.slice (0, -1); // Shorten the prefix by one character
      if (prefix === '') return '';
    }
  }
  return prefix;
}

console.log (longestCommonPrefix (['flower', 'flow', 'flight'])); // Output: 'fl'
console.log (longestCommonPrefix (['dog', 'racecar', 'car'])); // Output: ''
console.log (
  longestCommonPrefix (['interspecies', 'interstellar', 'interstate'])
); // Output: 'inter'
console.log (longestCommonPrefix (['prefix', 'prefixes', 'preform'])); // Output: 'pre'
console.log (longestCommonPrefix (['apple', 'banana', 'cherry'])); // Output: ''
console.log ('**************************************************');

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
