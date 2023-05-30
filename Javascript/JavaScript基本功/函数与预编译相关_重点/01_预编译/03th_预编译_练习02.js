function test() {
  console.log(b);//undefined
  if (a) {
    var b = 2;
  }
  c = 3;
  console.log(c)//3
}

var a;
test();
a = 1;
console.log(a)//1