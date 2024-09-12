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
