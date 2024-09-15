// 4. Write a JavaScript program to display the reading status (i.e. display book name, author name and reading status) of the following books.
// var library = [
//    {
//        author: 'Bill Gates',
//        title: 'The Road Ahead',
//        readingStatus: true
//    },
//    {
//        author: 'Steve Jobs',
//        title: 'Walter Isaacson',
//        readingStatus: true
//    },
//    {
//        author: 'Suzanne Collins',
//        title:  'Mockingjay: The Final Book of The Hunger Games',
//        readingStatus: false
//    }];

var library = [
  {
    author: 'Bill Gates',
    title: 'The Road Ahead',
    readingStatus: true,
  },
  {
    author: 'Steve Jobs',
    title: 'Walter Isaacson',
    readingStatus: true,
  },
  {
    author: 'Suzanne Collins',
    title: 'Mockingjay: The Final Book of The Hunger Games',
    readingStatus: false,
  },
];

console.log ('\n Question 4');
// To solve this question there are two possible ways using for loop or for of loop which is specially used in arrays.
// I have used the two methods for the purpose of learning

for (let i = 0; i < library.length; i++) {
  const bookElement = library[i];
  console.log (bookElement);
}

console.log ('\N OR');

for (const book of library) {
  console.log ('\n');
  console.log ('Book: ' + book.author);
  console.log ('Author: ' + book.title);
  console.log ('Reading Status: ' + book.readingStatus);
}
