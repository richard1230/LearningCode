/*
 splice 方法，它接收两个参数：从哪里开始删除项目的索引，和要删除的项目数。
 如果没有提供第二个参数，默认情况下是移除一直到结尾的所有元素。
 但 splice 方法会改变调用它的原始数组。


const cities = ["Chicago", "Delhi", "Islamabad", "London", "Berlin"];
cities.splice(3, 1); //[ 'London' ]

在这里 splice 返回字符串 London 并从城市数组中删除它。
cities 将有值 ["Chicago", "Delhi", "Islamabad", "Berlin"]。

使用slice而不是splice从数组中移除元素

* */

const cities = ["Chicago", "Delhi", "Islamabad", "London", "Berlin"];
console.log(cities.splice(3, 1));//[ 'London' ]
console.log(cities);//[ 'Chicago', 'Delhi', 'Islamabad', 'Berlin' ]


function nonMutatingSplice(cities) {
  // 只修改这一行下面的代码
  let newArray = cities.slice(0, 3);

  return newArray;

  // 只修改这一行上面的代码
}

const inputCities = ["Chicago", "Delhi", "Islamabad", "London", "Berlin"];
nonMutatingSplice(inputCities);
