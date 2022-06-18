(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')

module1.foo()
module2()
module3.bar()



},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){

module.exports = {
  msg:"this is module1",
  foo(){
    console.log(this.msg)
  }
}
},{}],3:[function(require,module,exports){
//module.exports = function(){} 暴露一个函数
module.exports = function(){
  console.log('thi is in module2');
}
//module.exports ={} //会覆盖上面写的
},{}],4:[function(require,module,exports){
//exports.xxx = value
exports.foo = function() {
  console.log('foo() module3');
}
exports.bar = function() {
  console.log('bar() module3');
}
exports.arr = [1,2,2,33,33,4,4,5,5]


},{}]},{},[1]);
