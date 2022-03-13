/*
*myReplace("Let us go to the store", "store", "mall")
*  应返回 Let us go to the mall。
*
*myReplace("He is Sleeping on the couch", "Sleeping", "sitting")
* 应返回 He is Sitting on the couch
*
*myReplace("I think we should look up there", "up", "Down")
* 应返回 I think we should look down there
* */


function myReplace(str, before, after) {
  const strArr = str.split(" ");
  const [wordToReplace] = strArr.filter(item => item === before);
  const replacement = wordToReplace[0] === wordToReplace[0].toUpperCase()
    ? after[0].toUpperCase() + after.slice(1)
    : after[0].toLowerCase() + after.slice(1);
  return strArr.map(item => (item === before ? replacement : item)).join(" ");
}

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
;


console.log(myReplace("I think we should look up there", "up", "Down"));


console.log(myReplace1("His name is Tom", "Tom", "john"));


function myReplace1(str, before, after) {
  let newArr = str.split(" ");
  const [needToReplace] = newArr.filter(word => word === before);
  const replaceword = needToReplace[0] === needToReplace[0].toUpperCase()
    ? after[0].toUpperCase() + after.slice(1)
    : after[0].toLowerCase() + after.slice(1)

  return newArr.map(word => word == before ? replaceword : word).join(" ")
}