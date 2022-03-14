/*
* The program needs to check if the second argument is a truthy element,
*
*  and it must check this for each object in the first argument.
* */

function truthCheck(collection, pre) {
  return collection.every(obj=>obj[pre]);
}

console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"},
  {"user": "Dipsy", "sex": "male"},
  {"user": "Laa-Laa", "sex": "female"},
  {"user": "Po", "sex": "female"}], "sex"));;