(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_module.foo, _module.bar, _module.arr); // 引入其他的模块
// 语法:import xxx from '路径'

console.log(_module2.fun, _module2.fun2);
console.log(_module4.default.foo());
},{"./module1":2,"./module2":3,"./module3":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
exports.bar = bar;
// 暴露模块 分别暴露
function foo() {
  console.log('foo() module1');
}

function bar() {
  console.log('bar() module1');
}

var arr = exports.arr = [1, 2, 3, 4, 5];
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 统一暴露
function fun() {
  console.log('fun() module2');
}
function fun2() {
  console.log('fun2() module2');
}

exports.fun = fun;
exports.fun2 = fun2;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 默认暴露  可以暴露任何类型
exports.default = {
  foo: function foo() {
    return console.log('foo in  module3');
  },
  bar: function bar() {
    console.log('箭头函数 in  module3');
  }
};
},{}]},{},[1]);
