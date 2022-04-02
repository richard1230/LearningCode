[地址](https://frontendmasters.com/courses/organizing-javascript/nested-scopes/)

## Nested Basics

```javascript

function foo() {
  var a = 1;

  function bar() {
    var b = 2;

    function baz() {
      var c = 3;
      console.log(a, b, c);//1,2,3
    }

    baz();
    console.log(a, b)//1,2
  }

  bar();
  console.log(a)//1

}

foo()


function makeAdder(x) {
  // x is an inner variable
  //inner function `add()` uses `x`
  // it has a "closure" over it
  function add(y) {
    return y + x;
  }

  return add;
}

var fn = makeAdder(5);
console.log(fn(10));
;//15
console.log(fn(20));
;//25


```

## Modules && Closure

```javascript
function Hello(name) {
  function speak(lastname) {
    return name + " " + lastname;
  }

  function firstName() {
    return name;
  }

  return {
    say: speak,
    firstName: firstName
  };
}

var O = Hello("Kyle");
console.log("this is : " + O.say("Simpson"));//Kyle Simpson
console.log("this is : " + O.firstName());//Kyle
```

## Public vs Private

```javascript
function hello1(name) {
  function upper(str) {
    return str.toUpperCase()
  }

  function speak(lastName) {
    // console.log(upper(name), lastName)
    return upper(name) + " " + lastName
  }

  return {
    say: speak
  }
}

var o1 = hello1("Kyle")
console.log(o1.say("Simpson"));//KYLE Simpson

```