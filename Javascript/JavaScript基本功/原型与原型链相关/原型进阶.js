function phone(color, brand) {
  this.color = color;
  this.brand = brand;
  this.screen = '18:9';
  this.system = "IOS";
}


var hp1 = new phone('red', "小米");
var hp2 = new phone('black', '华为');

console.log(hp1, hp2)//phone { color: 'red', brand: '小米', screen: '18.9', system: 'IOS' } phone { color: 'black', brand: '华为', screen: '18.9', system: 'IOS' }
phone.prototype.rom = '64G'
phone.prototype.ram = '16G'

console.log(hp1.rom)//64G
console.log(hp2.ram)//16G
//prototype是定义构造函数构造出的每个对象的公共祖先，
// 所有被该构造函数构造出的对象都可以继承原型上的属性和方法

phone.prototype.screen = '16:9'
console.log(hp2.screen)//18:9
console.log(hp1.screen)//18:9


//需要参数传值的就放到构造函数里面
//需要将数值写死的变量就写到原型里面
//写插件的时候由于不同实例所使用的方法都是一样的,故一般都将方法写到原型中

function Handphone(color, brand) {
  this.color = color;
  this.brand = brand;
}

// var hp1 = new Handphone()

// Handphone.prototype.screen = "18:9"
// Handphone.prototype.call = function () {
//   console.log(" hello i am calling")
// }
Handphone.prototype = {
  screen: "18.9",
  rom: "64G",
  ram: "6G",
  call: function () {
    console.log(" hello i am calling")
  }
}


var hp22 = new Handphone('red', '小米')
console.log(hp22.call());// hello i am calling


function Test() {
}

Test.prototype.name = 'prototype';

var test = new Test();

test.name = 'proto';
console.log(Test.prototype, test)//{ name: 'prototype' } Test { name: 'proto' }
delete Test.prototype.name





