var arr = [1, 2, 3,4];

var str = '123';

var obj = {a: 1, b: 2};

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

for (let i = 0; i < str.length; i++) {
  console.log(str[i])
}


arr.forEach(function (item) {
  console.log(item)
})

for (var i in obj) {
  console.log(i, obj[i]);
}


