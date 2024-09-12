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
