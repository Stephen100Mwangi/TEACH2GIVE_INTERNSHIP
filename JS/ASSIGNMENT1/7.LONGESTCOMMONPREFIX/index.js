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
