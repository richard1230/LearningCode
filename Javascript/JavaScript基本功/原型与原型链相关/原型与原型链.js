/*
对应名称：
 prototype: 原型
 __proto__: 原型链

 从属关系
 prototype ---> 一个函数的属性： 对象{}
 __proto__--->  一个实例化的对象的属性: 对象{}

 对象的__proto__保存着该对象的构造函数的prototype
* */

function Test() {
}

console.log(Test.prototype)

const test = new Test()
console.log(test.__proto__);
//对象的__proto__  等于 该对象的构造函数的prototype
console.log(test.__proto__ === Test.prototype);

console.log(Test.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__);//null

console.log("====================我是分割线=================");


function Test1() {
  this.a = 1;
  this.b = 333;
}

const test1 = new Test1()
Test1.prototype.b = 2;
console.log(test1);
Object.prototype.c = 3
/*
*  test1{
*==========================  A
*   a:1,
*   b:333,
* ========================== B
* __proto__: Test.prototype={
* ========================== C
*        b:2,
* ========================== D
*        __proto__ : Object.prototype = {
* ========================== E
*               c:3
* ========================== F
*              没有__proto__属性
*         }
*    }
* }
*
*以对象为基底，__proto__为链节点，Object为终点所形成的那条链为原型链
* */

console.log(test1.a);
console.log(test1.b);//333; 如果在A-->B之间没有发现b,那么就到CD之间找，以此类推，到EF
console.log(test1.c);//如果在A-->B之间没有发现c,那么就到CD之间找，以此类推，到EF

console.log("====================我是分割线=================");

//两个另类:  Function与Object   ==>既是函数又是对象
console.log("typeof Function");//function
console.log(typeof Function);//function


//底层就是这么规定的，不要问为什么
console.log(Function.prototype === Function.__proto__)//true
//底层
// const  Test = new Function()
console.log(Test.__proto__ == Function.prototype)//true


const obj = {}
// const obj = new Object()//底层
console.log(typeof Object);//function
console.log(Object.__proto__ === Function.prototype)//true
console.log(Object.__proto__ === Function.__proto__)//true


console.log("====================我是分割线=================");















