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
console.log(hp2.screen)//18:9, this中有先找this，没有找原型
console.log(hp1.screen)//18:9


//需要参数传值的就放到构造函数里面
//需要将数值写死的变量就写到原型里面
//写插件的时候由于不同实例所使用的方法都是一样的,故一般都将方法写到原型中

function Handphone(color, brand, system) {
  this.color = color;
  this.brand = brand;
  this.system = system;
}

// var hp1 = new Handphone()

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


console.log(Handphone.prototype);


function Car() {
  // var this = {
  //   __proto__: Car.prototype
  // }
}

console.log(Car.prototype);//consture默认指向构造函数本身,但是可以更改
console.log('========================================')
Car1.prototype.name = "Benz";

function Car1() {
}

Car1.prototype.name = "Mazda";
var car1 = new Car1();
console.log(car1.name)//Mazda
console.log('========================================')

Car10.prototype.name = "Benz";

function Car10() {
}

var car10 = new Car10();
Car10.prototype.name = "Mazda";

console.log(car10.name)//Mazda
console.log('========================================')
Car2.prototype.name = "Benz";

function Car2() {
}

var car2 = new Car2();
Car2.prototype = {        //如果这里的代码放在实例化之后，那么
  name: 'Mzada'           //name 就不会发生变化
}
console.log(car2.name)//Benz,
                      // 这里需要详细解释一下:
                      //constructor是指向构造函数本身的
                      //实例化之前:是下面这样的:
                      //Car.prototype.constructor -> Car() -> prototype -> name: "Benz"
//如果Car2.prototype这里的代码放在实例化之后，那么name 就不会发生变化
//__proto__--->  一个实例化的对象的属性
// function Car() {
//   // var this = {
//   //   __proto__: Car.prototype={
//          name : "Benz"
//        }
//   // }
// }
console.log('========================================')
Car3.prototype.name = "Benz";

function Car3() {
}

Car3.prototype = {
  name: 'Mzada'
}

var car3 = new Car3();

console.log(car3.name)//Mzada


  (function () {
    var a = 1;

    function add() {
      a++;
      console.log(a);
    }

    window.add = add;
  })();

add();//2
add();//3
add();//4




