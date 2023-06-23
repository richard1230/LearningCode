function test() {
  function closure() {
    console.log("this is closure");
  }
  return closure;
}

const a = test();
const b = test();

console.log( b);   //
console.log( a);   //

console.log( b === a);   //




// function f() {
//   const c = function e(){}
//   const d = function e(){}
//   console.log( c === d);
// }
//
// f()


