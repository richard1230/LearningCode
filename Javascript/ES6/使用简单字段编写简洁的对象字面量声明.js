const createPerson = (name, age, gender) => {
  // 只修改这一行下面的代码
  return {
    name,
    age,
    gender
  };
  // 只修改这一行上面的代码
};


/*
* ES6 添加了一些很棒的功能，用于更方便地定义对象。

请看以下代码：

const getMousePosition = (x, y) => ({
  x: x,
  y: y
});
getMousePosition 简单的函数，返回拥有两个属性的对象。
*  ES6 提供了一个语法糖，消除了类似 x: x 这种冗余的写法。
*  你可以只写一次 x，解释器会自动将其转换成 x: x（或效果相同的内容）。
* 下面是使用这种语法重写的同样的函数：
*
* */
