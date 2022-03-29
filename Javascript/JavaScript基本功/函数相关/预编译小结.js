//https://segmentfault.com/a/1190000018001871
var a = 1;
console.log(a);
function test(a) {
  console.log(a);
  var a = 123;
  console.log(a);
  function a() {}
  console.log(a);
  var b = function() {}
  console.log(b);
  function d() {}
}
var c = function (){
  console.log("I at C function");
}
console.log(c);
test(2);


/*
* 小结:
* 1.形参高于变量声明，低于函数声明，函数声明是最高，变量声明排在后
* 即:函数声明 >  形参 > 变量声明
*
* 2.console.log在前,函数声明正常打印
* */

console.log("===================test=========================================");

function test(a,b) {
  console.log(a);//1
  console.log(b);//[Function: b]
  console.log(c);//undefined

  c = 0;
  var c ;
  console.log(c);//0
  a = 5;
  console.log(a);//5

  b = 6;
  console.log(b);//6
  function b() {console.log("这是函数b")};
  function d() {};
  console.log(c);//0
  console.log(b);//6
  console.log(d);//[Function: d]
}

test(1);

console.log("===================test1=========================================");

function test1(a,b) {
  console.log(a);//1
  console.log(b);//[Function: b],注意，这里test1的b已经被赋值了，
                 // 即便如此,还是遵循函数声明 >  形参 > 变量声明  原则

  c = 0;
  var c ;
  a = 5;
  console.log(a);//5

  b = 6;
  console.log(b);//6
  function b() {console.log("这是函数b")};
  function d() {};
  console.log(b);//6
  console.log(d);//[Function: d]
}

test1(1,10);


console.log("===================test2=========================================");

function test2(a,b) {
  console.log(a);//[Function: a]
  console.log(b);//[Function: b],注意，这里test1的b已经被赋值了，
                 // 即便如此,还是遵循函数声明 >  形参 > 变量声明  原则

  c = 0;
  var c ;
  a = 5;
  console.log(a);//5

  b = 6;
  console.log(b);//6
  function a() {console.log("这是函数a")};

  function b() {console.log("这是函数b")};
  function d() {};
  console.log(b);//6
  console.log(a);//5
  console.log(d);//[Function: d]
}

test2(1,10);

console.log("===================test3=========================================");

function test3(a,b) {
  console.log(a);//1，注意:这里不是[Function: a],
                  // 因为遵循函数声明 >  形参 > 变量声明  原则
  console.log(b);//[Function: b],注意，这里test1的b已经被赋值了，
                 // 即便如此,还是遵循函数声明 >  形参 > 变量声明  原则

  c = 0;
  var c ;
  a = 5;
  console.log(a);//5

  b = 6;
  console.log(b);//6
  a =  function a() {console.log("这是函数a")};

  function b() {console.log("这是函数b")};
  function d() {};
  console.log(b);//6
  console.log(a);//[Function: a]
  console.log(d);//[Function: d]
}

test3(1,10);