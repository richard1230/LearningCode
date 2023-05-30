function test1(a, b) {

  console.log(a);//
  console.log(b);//

  console.log(c)//
  c = 0;
  var c;
  a = 5;
  console.log(a);//

  b = 6;
  console.log(b);//
  function b() {
    console.log("这是函数b")
  };

  function d() {
  };
  console.log(b);//
  console.log(d);//
}

test1(1, 10);