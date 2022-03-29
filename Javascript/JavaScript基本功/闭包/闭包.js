//函数作为返回值
function test() {
  const a = 1;
  return function () {
    console.log('a:', a);
  }
}

const fn = test();
const a = 2;
fn()//a: 1


//函数作为参数
function test1(fn1) {
  const b = 1;
  fn1();
}

const b = 2;

function fn1() {
  console.log('b:', b);
}

test1(fn1)//b: 2
