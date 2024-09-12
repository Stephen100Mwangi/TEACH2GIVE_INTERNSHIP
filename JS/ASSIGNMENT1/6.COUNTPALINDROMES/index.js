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
