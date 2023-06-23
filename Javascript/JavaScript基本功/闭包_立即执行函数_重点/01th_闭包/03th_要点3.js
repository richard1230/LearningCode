
function test5() {
  var num = 0;    //s1
  function add() {//s2
    console.log(++num)
  }
  return add;
}
var add = test5();
console.log(add());//1 undefined
console.log(add());//2 undefined
console.log(add());//3 undefined
console.log(add());//4 undefined
console.log(add());//5 undefined

