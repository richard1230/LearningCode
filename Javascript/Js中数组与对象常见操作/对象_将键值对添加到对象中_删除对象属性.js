//两种方法给对象添加属性
let foods = {
  apples: 25,
  oranges: 32,
  plums: 28
};

// 只修改这一行下面的代码
foods.bananas = 13;

let grapes = "grapes"
foods[grapes] = 35;

foods["strawberries"] = 27;
// 只修改这一行上面的代码

console.log(foods);