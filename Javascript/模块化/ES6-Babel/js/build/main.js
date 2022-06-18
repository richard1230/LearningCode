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