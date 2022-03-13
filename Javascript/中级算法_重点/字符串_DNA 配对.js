/*
这个 function 接收一个字符串参数 str，为需要转换的字符串。返回值为转换之后的二维数组
例如，第一个参数是 "GCG"，那么返回值就是 [["G", "C"], ["C", "G"], ["G", "C"]]
匹配关系也不复杂，"G" 和 "C" 互相匹配，"A" 和 "T" 互相匹配
* */


function pairElement(str) {
  let newstr=[];
  for (let i = 0; i < str.length; i++) {
         if (str[i]=== 'G'){
             newstr.push(['G','C'])
         }else if (str[i]=== 'C'){
           newstr.push(['C','G'])
         }else if (str[i] === 'A') {
           newstr.push(['A', 'T']);
         } else if (str[i] === 'T') {
           newstr.push(['T', 'A']);
         }
  }
  return newstr;
}

console.log(pairElement("GCG"));;
