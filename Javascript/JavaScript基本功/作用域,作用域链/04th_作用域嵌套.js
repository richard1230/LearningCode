//像Javascript中函数可以在一个函数内部声明另一个函数一样，作用域也可以嵌套在另一个作用域中。请看例子：

var name = 'Peter';
function greet() {
  var greeting = 'Hello';
  {
    let lang = 'English';
    console.log(`${lang}: ${greeting} ${name}`);
  }
}
greet();//English: Hello Peter


