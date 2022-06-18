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