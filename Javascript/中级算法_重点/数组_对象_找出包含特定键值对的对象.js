//https://singsing.io/blog/fcc/intermediate-where-art-thou/
function whatIsInAName(collection, source) {
  const arr = [];
  // 只修改这一行下面的代码
  for (let i = 0; i < collection.length; i++) {
    let flag = true


    for (const key in source) {
      if (collection[i][key] !== source[key]) {
        flag = false
      }
    }

    if (flag) {
      arr.push(collection[i])
    }

  }
  // 只修改这一行上面的代码
  return arr;
}

console.log(whatIsInAName([{first: "Romeo", last: "Montague"},
    {first: "Mercutio", last: null},
    {first: "Tybalt", last: "Capulet"}],
  {last: "Capulet"}));
//[ { first: 'Tybalt', last: 'Capulet' } ]

console.log(whatIsInAName([{"a": 1, "b": 2, "c": 3}], {"a": 1, "b": 9999, "c": 3}));
//[]

console.log(whatIsInAName1([{"apple": 1, "bat": 2}, {"apple": 1}, {
  "apple": 1,
  "bat": 2,
  "cookie": 2
}, {"bat": 2}], {"apple": 1, "bat": 2}));
//[ { apple: 1, bat: 2 }, { apple: 1, bat: 2, cookie: 2 } ]

console.log(whatIsInAName2([{"apple": 1, "bat": 2}, {"apple": 1}, {
  "apple": 1,
  "bat": 2,
  "cookie": 2
}, {"bat": 2}], {"apple": 1, "bat": 2}));
//[ { apple: 1, bat: 2 }, { apple: 1, bat: 2, cookie: 2 } ]

//https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-wherefore-art-thou/16092
function whatIsInAName2(collection, source) {
  // const arr = [];
  // 只修改这一行下面的代码
  let keys = Object.keys(source);
  // 只修改这一行上面的代码
  return collection.filter(function (obj) {
    for (let i = 0; i < keys.length; i++) {
      if (!obj.hasOwnProperty(keys[i]) || obj[keys[i]] !== source[keys[i]]) {
        return false
      }
    }
    return true
  })
}

//https://singsing.io/blog/fcc/intermediate-where-art-thou/
function whatIsInAName1(collection, source) {
  // const arr = [];
  // 只修改这一行下面的代码
  let keys = Object.keys(source);
  // 只修改这一行上面的代码
  return collection.filter(e => {
    //map其实暗含了迭代所以不用写成上面的collection[i][key]的形式
    return keys.map(key => {
      return e[key] === source[key]
    })
      .reduce((prev, next) => {
        return prev && next
      }, true)
  })
}