
## Promise局限性
### 顺序错误处理
```javascript
let p = Promise.resolve(42);
p.then(function fullfilled(message) {
  //数字没有string函数，所以这里会抛出错误
  console.log(message.toLowCase())
},function reject(err) {
   //这里永远接受不到上面message.toLowCase()的错误
})
```
在上面的例子中:<br>
在执行then()中的fulfilled()或rejected()发生错误时，这个错误是交给then()返回生成的新promise去处理错误(即p的下一个promise去处理)
而不是当前的promise p去处理。这里很明显没有下一个then,因此，这很容易造成错误被吞掉。
<br>
有些人为了避免丢失被忽略和抛弃的promise错误，在promise链的最后以一个catch(…)结束。比如：
```javascript
var p=Promise.resolve(42);
    p.then(
      function fulfilled(msg){
        //数字没有string函数，所以这里会抛出错误
        console.log(msg.toLowerCase());
      }
      //当没有声明错误处理函数，就会执行下面的默认错误处理函数
      //function(err){
      //			throw err;
      //}
    )
    .catch(handleErrors);

```
### 单一值
根据定义，promise只能有一个完成值或一个拒绝理由。在简单的例子中，这不是什么问题，但是在更复杂的场景中，这可能就是一种局限了。

一般的建议是构建一个值封装(一个对象或数组)来保持这样的多个信息。这个方案可以起作用，但要在每个promise链中的每一步都进行封装和解封，就十分笨重和丑陋了。

看下面代码：
```javascript
function getY(x){
  return new Promise(function (resolve,reject){
    resolve(3*x-1);
  })
}

function foo(bar,baz){
  var x=bar*baz;
  return [
    Promise.resolve(x),
    getY(x)
  ];
}

Promise.all(
  foo(10,20)
).then(
  function(msgs){
    var x=msgs[0];
    var y=msgs[1];
    console.log(x,y);//200 599
  }
)

```
看到了吧，最后传给then()方法的仍是“一个值”，但是这个值是数组可以包含多个值。
ES6给出了更好的解决方案：解构。数组解构赋值形式看起来是这样的：
```javascript
Promise.all(
  foo(10,20)
)
.then(function(msgs){
  var [x,y]=msgs;
  console.log(x,y);//200  599
})

```
最好的还是数组参数解构形式：

```javascript
Promise.all(
  foo(10,20)
)
.then(function([x,y]){
  console.log(x,y);//200  599
})

```

### 无法取消的Promise
一旦创建了一个Promise并为其注册了完成/拒绝处理函数，如果出现某种情况使得某个任务悬而未决的话，你也没有办法从外部停止它。
有许多开发者采用Promise超时来取消决议：<br>
```javascript
var p=foo(42);//foo()会返回经过一系列处理的promise
function timeoutPromise(delay){
    return new Promise(function(resolve,reject){
      setTimeout(()=>{
        reject("timeout")
      },3000)
    });
}

Promise.race([
  p,//下面timeoutPromise里面的reject无法停止当前这个p(如果这个p被创建)
  timeoutPromise(3000)//这里面的reject相对于上面的p是外部的
])
.then(
  (data)=>{
    //...foo()成功
  }
  ,
  (err)=>{
    //foo()可能被拒绝，或者是因为超时没完成被中止决议
    console.log(err);
  }
)

```
当在3秒之后p还未决议完成的话，就会利用timeoutPromise()来调用reject()来返回一个已经决议的拒接,
因为Promise.race(…)的作用是时会响应“第一个跨过终点线的Promise”，而抛弃其它Promise，从而确保then()函数的执行，但是这个“超时”相对于Promise p是外部的，所以p本身仍然还是继续运行，这一点可不是我们所期望的。这就是Promise无法取消的局限性。


## 单决议
Promise最本质的一个特征是：Promise只能被决议一次(完成或拒接)，你只会获取一个值一次。
设想这样的一个场景，你可能要启动一系列异步步骤以响应某种可能多次发生的激励，比如按钮点击。

但这样做不会达到你的期望：

```javascript
<button id="btn">点击</button>

var pro=new Promise(function(resolve,reject){
      var btn=document.getElementById("btn");
      btn.addEventListener("click",()=>{
        resolve("has clicked");
      })
    });
    
pro.then(function resolved(){
      console.log("has clicked");
    })
```
当你第一点击按钮时，控制台会打印"has clicked"，但接着点击是不会再响应了。这是因为promise pro已经决议，第二个resolve(…)调用就会被忽略。再次点击按钮就没反应了。
我们都知道监听按钮不会这样使用，但这段代码能反映出promise是单决议的。