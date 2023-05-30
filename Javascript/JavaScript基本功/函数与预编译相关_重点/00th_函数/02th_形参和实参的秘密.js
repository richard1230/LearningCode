function f1(a,b) {
  a = 3;
  b = 5;
  console.log(arguments[0]);//3
  console.log(arguments[1]);//5
}



f1(1,2)

console.log("=======我是分割线=======");


f1(9,10,5)


