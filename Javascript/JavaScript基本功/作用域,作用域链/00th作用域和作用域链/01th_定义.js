if (true) {
  // 这个 'if' 块语句没有创建一个块级作用域

  // name 变量处于全局作用域，因为由var关键字声明
  var name = 'Hammad';
  // likes 变量处于块级作用域因为由let关键字声明
  let likes = 'Coding';
  // skills 变量处于块级作用域因为由const关键字声明
  const skills = 'JavaScript and PHP';
}

console.log(name); // 输出 'Hammad'
console.log(likes); // Uncaught ReferenceError: likes is not defined
console.log(skills); // Uncaught ReferenceError: skills is not defined