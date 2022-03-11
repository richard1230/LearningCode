// 全局变量
const bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// 修改这行下面的代码
function add(bookName,bookList) {

  // bookList.push(bookName);
  // return bookList;

  return bookList.concat(bookName);
  // 修改这行上面的代码
}

// 修改这行下面的代码
function remove(bookName,bookList) {
  // const book_index = bookList.indexOf(bookName);
  // if (book_index >= 0) {

  //   bookList.splice(book_index, 1);
  //   return bookList;

  return bookList.filter(x=>x!==bookName);


  // 修改这行上面的代码

}

const newBookList = add(bookList, 'A Brief History of Time');
const newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
const newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');

console.log(bookList);