//词法作用域（也叫静态作用域）从字面意义上看是说作用域在词法化阶段（通常是编译阶段）确定而非执行阶段确定的。看例子：


let number = 42;
function printNumber() {
  console.log(number);
}
function log() {
  let number = 54;
  printNumber();
  // console.log(number);//54
}
// Prints 42
log();




