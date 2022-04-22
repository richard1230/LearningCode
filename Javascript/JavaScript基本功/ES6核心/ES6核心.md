## 前言

ES6三大核心: class,promise, module

其中,与promise相关的主要是迭代器,生成器,promise,async,await相关的;<br>

遍历和迭代的区别:
迭代:
从目标源依次 逐个 抽取的方式来提取数据; (遍历并不一定是依次的)
目标源满足: 1.有序的; 2.连续的
由于对象上面的数据不是有序的,有时候对象并不能直接遍历

```javascript
let map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
console.log(map)//Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 } ;
// 0: a → 1
// 1: b → 2
// 2: c → 3


console.log(new Set([1, 2, 3, 4, 5]))//Set(5) { 1, 2, 3, 4, 5 }
//0: 1
// 1: 2
// 2: 3
// 3: 4
// 4: 5

```