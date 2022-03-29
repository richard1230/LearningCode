

a = 1

function test1(e) {
  function e() {
  }

  arguments[0] = 2;
  console.log(e);//2
  a = 4;
  if (a) {
    var b = 3;
  }
  var c;
  // a = 4;
  var a;
  console.log(b);//3
  f = 5;
  console.log(c); //undefined
  console.log(a);//4
}

var a;
test1(1);
console.log(a);//1
console.log(f);//5


/*
GO = {
a : undefined  ==> 1,
test: function test(){},
f : 5
}


AO={
 e:undefined ->
 1           ->
 function e(){} ->
 2,

 b:undefined ---> 3
 c:undefined,
 a:undefined -> 4
 }
* */



