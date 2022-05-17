

var obj = {
  '2':3,
  '3':4,
  'length':2,
  "push":Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj)
// { '2': 1, '3': 2, length: 4, push: [Function: push] }
//其实此时下标为0和1的内存里面为空

/*原理:
Array.prototype.push = function (elem) {
  this[this.length] = elem;
  this.length++
}
*/
