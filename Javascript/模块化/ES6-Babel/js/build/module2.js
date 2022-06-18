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