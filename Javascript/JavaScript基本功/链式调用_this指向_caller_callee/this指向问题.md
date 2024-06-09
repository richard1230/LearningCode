[TOC]

# this指向问题总结

## new 绑定

### 什么是 new

学过面向对象的小伙伴对new肯定不陌生，js的new和传统的面向对象语言的new的作用都是创建一个新的对象，但是他们的机制完全不同。

创建一个新对象少不了一个概念，那就是构造函数，传统的面向对象 构造函数 是类里的一种特殊函数，要创建对象时使用new 类名()的形式去调用类中的构造函数，而js中就不一样了。

js中的只要用new修饰的 函数就是'构造函数'，准确来说是 函数的构造调用，因为在js中并不存在所谓的'构造函数'。

那么用new 做到函数的构造调用后，js帮我们做了什么工作呢:

创建一个新对象。 把这个新对象的__proto__属性指向 原函数的prototype属性。(即继承原函数的原型)
将这个新对象绑定到 此函数的this上 。 返回新对象，如果这个函数没有返回其他对象。 第三条就是我们下面要聊的new绑定

### new 绑定

```javascript
function foo(){
    this.a = 10;
    console.log(this);
}
foo();                    // window对象
console.log(window.a);    // 10   默认绑定

var obj = new foo();      // foo{ a : 10 }  创建的新对象的默认名为函数名
                          // 然后等价于 foo { a : 10 };  var obj = foo;
console.log(obj.a);       // 10    new绑定

```

使用new调用函数后，函数会 以自己的名字 命名 和 创建 一个新的对象，并返回。

特别注意 : 如果原函数返回一个对象类型，那么将无法返回新对象,你将丢失绑定this的新对象，例:

```javascript
function foo(){
    this.a = 10;
    return new String("捣蛋鬼");
}
var obj = new foo();
console.log(obj.a);       // undefined
console.log(obj);         // "捣蛋鬼"


```

## 显性绑定

### call,apply,bind

这里我们就要用到 js 给我们提供的函数 call 和 apply，它们的作用都是改变函数的this指向，第一个参数都是 设置this对象。

两个函数的区别：

call从第二个参数开始所有的参数都是 原函数的参数。 apply只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表。 例如：

```javascript
function foo(a,b){
    console.log(a+b);
}
foo.call(null,'海洋','饼干');        // 海洋饼干  这里this指向不重要就写null了
foo.apply(null, ['海洋','饼干'] );     // 海洋饼干

```

除了 call，apply函数以外，还有一个改变this的函数 bind ，它和call,apply都不同。 bind只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回。例:

```javascript
function foo(){
    console.log(this.a);
}
var obj = { a : 10 };

foo = foo.bind(obj);
foo();                    // 10

```

### 显性绑定

```javascript
function foo(){
    console.log(this.a);
}
var obj = {
    a : 10            //去掉里面的foo
}
foo.call(obj);        // 10

```

我们将隐性绑定例子中的 上下文对象 里的函数去掉了，显然现在不能用 上下文.函数 这种形式来调用函数，大家看代码里的显性绑定代码foo.call(obj)，看起来很怪，和我们之前所了解的函数调用不一样。

其实call 是 foo 上的一个函数,在改变this指向的同时执行这个函数。

## 隐性绑定

```javascript
function foo(){
    console.log(this.a);//这里的this是函数内部的,故指向window
var obj = {
    a : 10,
    foo : foo
}
foo();                // 

obj.foo();        // 隐性绑定
```

答案 : undefined 10

foo()的这个写法熟悉吗，就是默认绑定,等价于打印window.a,故输出undefined , 下面obj.foo()这种大家应该经常写，这其实就是我们马上要讨论的 隐性绑定 。

函数foo执行的时候有了上下文对象，即 obj。这种情况下，函数里的this默认绑定为上下文对象，等价于打印obj.a,故输出10 。

如果是链性的关系，比如 xx.yy.obj.foo();, 上下文取函数的直接上级，即紧挨着的那个，或者说对象链的最后一个。

## 默认绑定(函数内部的this)

考虑下面代码:

```
function foo(){
    var a = 1 ;
    console.log(this.a);    // 10
}
var a = 10;
foo();

```

这种就是典型的默认绑定，我们看看foo调用的位置，”光杆司令“，像 这种直接使用而不带任何修饰的函数调用 ，就 默认且只能 应用 默认绑定。 那默认绑定到哪呢，一般是window上，严格模式下 是undefined。

```javascript
//函数内部的this ---> 指向window
//全局的this ---> 指向window (默认情况下)
// function f(b) {
//   this.d = 3;
//   c = 2
//   window.f = 7
//   var a = 1;
//
// }
//
// f(123)
// console.log(this.d)//3
// console.log(c)//2
// console.log(f)//7
// console.log(a)//会报错

function foo() {
  a = 1;
  console.log(this.a);
}

var a = 10;
foo();//1,-->这个函数里面的a其实是全局的,相当于函数里面的a将外面的a给覆盖了
console.log("====================================")

function foo() {
  var a = 1;
  console.log(this.a);//函数内部的this ---> 指向window
}

var a = 10;
foo();//10
```


## 总结-重要
如果函数被new 修饰

>this绑定的是新创建的对象，例:var bar = new foo(); 函数 foo 中的 this 就是一个叫foo的新创建的对象 , 然后将这个对象赋给bar , 这样的绑定方式叫 new绑定 .

如果函数是使用call,apply,bind来调用的

>this绑定的是 call,apply,bind 的第一个参数.例: foo.call(obj); , foo 中的 this 就是 obj , 这样的绑定方式叫 显性绑定 .

如果函数是在某个 上下文对象 下被调用

>this绑定的是那个上下文对象，例 : var obj = { foo : foo }; obj.foo(); foo 中的 this 就是 obj . 这样的绑定方式叫 隐性绑定 .

如果都不是，即使用默认绑定
>例:function foo(){...} foo() ,foo 中的 this 就是 window.(严格模式下默认绑定到undefined).
这样的绑定方式叫 默认绑定 .


```
new 绑定 > 显性绑定 > 隐式绑定 > 默认绑定
```

## this补充

```javascript
var a = 5;
  function f2() {
    a = 0;
    console.log(a);
    console.log(this.a);
    var a ;
    console.log(a);
  }
  f2();//此时this指代的是windows--->0 5 0
  new f2();//此时this指代的是具体的对象--->0 undefined 0
```

## 面试题
```javascript
var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);        // ?
        var foo = function(){ 
            console.log(this.x);    
            }
        foo();                      // ?
    }
};
obj.f();


```
-----------------------答案---------------------
答案 ： 20 10
解析 ：考点 1. this默认绑定 2. this隐性绑定
```javascript
var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);    // 20
                                // 典型的隐性绑定,这里 f 的this指向上下文 obj ,即输出 20
        function foo(){ 
            console.log(this.x); 
            }
        foo();       // 10
                     //有些人在这个地方就想当然的觉得 foo 在函数 f 里,也在 f 里执行，
                     //那 this 肯定是指向obj 啊 , 仔细看看我们说的this绑定规则 , 对应一下很容易
                     //发现这种'光杆司令'，是我们一开始就示范的默认绑定,这里this绑定的是window
    }
};
obj.f();             


```
2th题:
```javascript

function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // ?
console.log(b.a);    // ?

```

-----------------------答案---------------------

答案 ： undefined 10
解析 ：考点 1. 全局污染 2. this默认绑定

这道题很有意思，问题基本上都集中在第一undefined上，这其实是题目的小陷阱，但是追栈的过程绝对精彩
让我们一步步分析这里发生了什么：

foo(1)执行，应该不难看出是默认绑定吧 , this指向了window，函数里等价于 window.a = 1,return window;
var a = foo(1) 等价于 window.a = window , 很多人都忽略了var a 就是window.a ，将刚刚赋值的 1 替换掉了。
所以这里的 a 的值是 window , a.a 也是window ， 即window.a = window ; window.a.a = window;
foo(10) 和第一次一样，都是默认绑定，这个时候，将window.a 赋值成 10 ，注意这里是关键，原来window.a = window ,现在被赋值成了10，变成了值类型，所以现在 a.a = undefined。(验证这一点只需要将var b = foo(10);删掉，这里的 a.a 还是window)
var b = foo(10); 等价于 window.b = window;
本题中所有变量的值，a = window.a = 10 , a.a = undefined , b = window , b.a = window.a = 10;
3th题:
```javascript
var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();    // 20
            //有上下文，this为obj，隐性绑定
bar();      // 10
            //'光杆司令' 默认绑定  （ obj.f 只是普通的赋值操作 ）
obj2.f();   //30
            //不管 f 函数怎么折腾，this只和 执行位置和方式有关，即我们所说的绑定规则
            



```

4th题:
```javascript
function foo() {
    getName = function () { console.log (1); };
    return this;
}
foo.getName = function () { console.log(2);};
foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName () { console.log(5);}
 
foo.getName ();                // ?
getName ();                    // ?
foo().getName ();              // ?
getName ();                    // ?
new foo.getName ();            // ?
new foo().getName ();          // ?
new new foo().getName ();      // ?



```
答案：2 4 1 1 2 3 3
解析：考点 1. new绑定 2.隐性绑定 3. 默认绑定 4.变量污染
```javascript
function foo() {
   //var b = 1 //这里的b不是全局变量
  // a = 1  //与下面一行作对比,此时的a就是一个全局变量,将创建到全局window上
    getName = function () { console.log (1); }; 
            //这里的getName 将创建到全局window上
    return this;//函数里面的this指向window
}
foo.getName = function () { console.log(2);};   
        //这个getName和上面的不同，是直接添加到foo上的
foo.prototype.getName = function () { console.log(3);}; 
        // 这个getName直接添加到foo的原型上，在用new创建新对象时将直接添加到新对象上 
var getName = function () { console.log(4);}; 
        // 和foo函数里的getName一样, 将创建到全局window上
function getName () { console.log(5);}    
        // 同上，但是这个函数不会被使用，因为函数声明的提升优先级最高，所以上面的函数表达式将永远替换
        // 这个同名函数，除非在函数表达式赋值前去调用getName()，但是在本题中，函数调用都在函数表达式
        // 之后，所以这个函数可以忽略了
        
        // 通过上面对 getName的分析基本上答案已经出来了

foo.getName ();                // 2
                              //其实是将foo当做对象了,调用的是对象foo的getName()方法
                               // 下面为了方便，我就使用输出值来简称每个getName函数
                               // 这里有小伙伴疑惑是在 2 和 3 之间，觉得应该是3 , 但其实直接设置
                               // foo.prototype上的属性，对当前这个对象的属性是没有影响的,如果要使
                               // 用的话，可以foo.prototype.getName() 这样调用 ，这里需要知道的是
                               // 3 并不会覆盖 2，两者不冲突 ( 当你使用new 创建对象时，这里的
                               // Prototype 将自动绑定到新对象上，即用new 构造调用的第二个作用)
                               
getName ();                    // 4 
                               // 这里涉及到函数提升的问题，不知道的小伙伴只需要知道 5 会被 4 覆盖，
                               // 虽然 5 在 4 的下面，其实 js 并不是完全的自上而下，想要深入了解的
                               // 小伙伴可以看文章最后的链接
                               
foo().getName ();              // 1 
                               // 这里的foo函数执行完成了两件事,
                               // 1. 将window.getName设置为1,
                               // 2. 返回window , 故等价于 window.getName(); //注意:foo里的getName 创建到全局window上,故输出 1
                              
getName ();                    // 1
                               // 刚刚上面的函数刚把window.getName设置为1,故同上 输出 1,就是说getName被覆盖了
                               
new foo.getName ();            // 2
                               // new 对一个函数进行构造调用 , 即 foo.getName ,构造调用也是调用啊
                               // 该执行还是执行，然后返回一个新对象，输出 2 (虽然这里没有接收新
                               // 创建的对象但是我们可以猜到，是一个函数名为 foo.getName 的对象
                               // 且__proto__属性里有一个getName函数，是上面设置的 3 函数)
                               //注意:执行顺序: xxx = foo.getName() ---> new x
new foo().getName ();          // 3
                               // 这里特别的地方就来了,new 是对一个函数进行构造调用,它直接找到了离它
                               // 最近的函数,foo(),并返回了应该新对象,等价于 var obj = new foo();
                               // obj.getName(); 这样就很清晰了,输出的是之前绑定到prototype上的
                               // 那个getName  3 ,因为使用new后会将函数的prototype继承给 新对象
                               //yyy = new foo() --> yyy.getName()
new new foo().getName ();      // 3
                               // 哈哈，这个看上去很吓人，让我们来分解一下：
                               // var obj = new foo();
                               // var obj1 = new obj.getName();
                               // 好了，仔细看看, 这不就是上两题的合体吗,obj 有getName 3, 即输出3
                               // obj 是一个函数名为 foo的对象,obj1是一个函数名为obj.getName的对象


```
5th题
```javascript
  class Person{
    constructor(name) {
      this.name = 18;
      console.log("constructor里面的this:"+this);
    };
    test11(){
      console.log("对象方法里面的this: ",this)
    };

    asyncTest(){
      console.log("对象方法里面的this,但是是在setTimeout外面的: ",this)//this指向Person

      setTimeout(function () {
        console.log('setTimeout 回调中的this: ',this)
      },0)
    }

    asyncTest1(){
      setTimeout(()=> {
        console.log('setTimeout 回调中的this,注意这里用的是箭头函数: ',this)
      },0)
    }
  }

  const zs = new Person(20);//constructor里面的this:[object Object]
  zs.test11();//对象方法里面的this:  Person
  zs.asyncTest();//setTimeout 回调中的this:  Window---->因为是直接执行的
  zs.asyncTest1()//setTimeout 回调中的this,注意这里用的是箭头函数:  Person
                // =====>注意:这里箭头函数的this与上一级作用域this指向是一样的!!!
```

