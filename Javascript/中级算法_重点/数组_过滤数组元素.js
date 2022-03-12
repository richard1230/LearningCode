function destroyer(arr, ...needToRemove) {
  //item是arr里面的元素
  return arr.filter(item => needToRemove.indexOf(item) == -1);
}


function destroyer1(arr, ...needToRemove) {
  //item是arr里面的元素
  return arr.filter(item => !needToRemove.includes(item));
}


console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
;
console.log(destroyer1([1, 2, 3, 1, 2, 3], 2, 3));
;