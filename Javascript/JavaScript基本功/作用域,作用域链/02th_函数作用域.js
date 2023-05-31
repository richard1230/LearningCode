function greet() {
  var greeting = 'Hello World!';
  console.log(greeting);
}
// 打印 'Hello World!'
greet();
// 报错： ReferenceError: greeting is not defined
console.log(greeting);

//函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问。
//对于var定义的变量，函数外面无法访问里面var定义的变量