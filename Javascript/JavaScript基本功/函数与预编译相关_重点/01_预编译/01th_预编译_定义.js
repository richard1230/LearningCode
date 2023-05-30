function test(a, b) {
  console.log(a);//1
  console.log(b);//function b
  console.log(c);//undefined


  c = 0;
  var c;
  console.log(c);//0
  a = 5;
  console.log(a);//5

  b = 6;// var b; b=6
  console.log(b);//6
  function b() {
    console.log("这是函数b")
  };

  function d() {
  };
  console.log(b);//6
  console.log(d);//function d
}

test(1);

//console.log 之前有赋值行为就打印所有的赋的值 > 函数声明  > 形参 > 变量声明


