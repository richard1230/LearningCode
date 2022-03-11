


const squareList = arr => {
  // 只修改这一行下面的代码
  return arr.filter(num=>/^\+?[1-9][0-9]*$/.test(num)).map(num=>Math.pow(num,2));
  // 只修改这一行上面的代码
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);

/*
* map的作用:
* 1.提取数组中每个对象的属性
* const users = [
  { name: 'John', age: 34 },
  { name: 'Amy', age: 20 },
  { name: 'camperCat', age: 10 }
];

const names = users.map(user => user.name);
console.log(names);
*
* [ 'John', 'Amy', 'camperCat' ]
*
* 2.对数组中的每个对象进行操作:
* const squareList = arr => {
  // 只修改这一行下面的代码
  return arr.filter(num=>/^\+?[1-9][0-9]*$/.test(num)).map(num=>Math.pow(num,2));
  // 只修改这一行上面的代码
};
* */