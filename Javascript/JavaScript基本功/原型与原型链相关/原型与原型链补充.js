/*原型的5大原则(重点)
1、所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了“null”以外）
2、所有的对象(严格来说是实例化的对象)，都有一个__proto__（隐式原型）属性，属性值是一个普通的对象
3、所有的函数，都有一个 prototype（显式原型） 属性，属性值也是一个普通的对象
4、所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的“prototype”属性值
5、当试图得到一个对象的某个属性时，并且这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找。
* */
function Person() {
  this.smoke = function () {
    this.weight--;
  }

  Person.prototype = {
    weight: 130
  }

  var person = new Person();

  console.log(person.smoke());;
}



var obj1 = {}
console.log(obj1)//constructor: function Object()

var obj2 = new Object();//不用这种写法，一般
console.log(obj2);//constructor: function Object()

function Obj() {
}

console.log(Obj);////constructor: function Obj()
//小结:前面两种(一个是自定义的对象,一个是系统内置的Object),他们的构造函数均指向Object;
//就是说前两种都是对象,然后对象都有一个__proto__属性,这个属性里面又包含了大量对象
//其中一个对象就是 constructor: function Object()-->他们的构造函数均指向Object;
//自定义的函数,其构造函数指向自定义的函数
//函数都有一个属性为prototype
//prototype这个属性里面存放的又是对象,这些对象里面有个为constructor: function Obj()
var obj = new Obj();
console.log(obj)

console.log(obj.__proto__)//Obj.prototype




function fun() {}

fun.prototype.num = 1;
var test = {
  num:2
}

var obj1 = Object.create(fun.prototype)
var obj2 = new fun();
var obj11 = Object.create(test);
console.log(obj1);//obj1与obj2效果一模一样
console.log(obj2);//
console.log(obj11);
console.log(obj11.__proto__ === test);//true


//创建空对象
var obj111 = Object.create(null);
console.log(obj111)//obj111是没有任何属性的,原型也没
obj111.num = 1;
var obj222 = Object.create(obj111);
console.log(obj222)
obj111.toString()//这里会报错
//不是所有的对象都继承于Object.prototype,如果是继承于的，那么上面就不应该报错
//undefined,null没有toString方法
//number有toString方法














