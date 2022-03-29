function test() {
  return a;
  a = 1;

  function a() {
  }

  var a = 2;
}

console.log(test())//[Function: a]

function test1(e) {
  function e() {
  }

  arguments[0] = 2;
  console.log(e);//2
  if (a) {
    var b = 3;
  }
  var c;
  a = 4;
  var a;
  console.log(b);//undefined
  f = 5;
  console.log(c); //undefined
  console.log(a);//4
}

var a;
test1(1);







