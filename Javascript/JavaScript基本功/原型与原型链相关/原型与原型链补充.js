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



var obj1 = {name:"richard"}
console.log(obj1)//constructor: function Object()

var obj2 = new Object();//不用这种写法，一般
console.log(obj2);//constructor: function Object()

function Obj() {
}

console.log(Obj);////constructor: function Obj()
//小结:前面两种(一个是自定义的对象,一个是系统内置的Object),他们的构造函数均指向Object;
//自定义的函数,其构造函数指向自定义的函数
var obj = new Obj();
console.log(obj)

console.log(obj.__proto__)//



