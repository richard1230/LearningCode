//当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域。
// 如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错。
// 例如：

let foo = 'foo';
function bar() {
  let baz = 'baz';
  // 打印 'baz'
  console.log(baz);
  // 打印 'foo'
  console.log(foo);
  number = 42;
  console.log(number);  // 打印 42
}
bar();



