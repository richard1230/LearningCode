function test() {

  const a = 1;

  return function func() {//
    console.log('a:', a);
  }
}

const fn = test();
const a = 2;
fn()//a: ？1



function test1(fn1) {
  const b = 1;
  fn1();
}

const b = 2;

function fn1() {//
  console.log('b:', b);
}

test1(fn1)//b:2