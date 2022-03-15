/*
https://singsing.io/blog/fcc/basic-caesars-cipher/


* */

function rot13(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let currentCode = str[i].charCodeAt();
    if (currentCode > 90 || currentCode < 65) {
      result += String.fromCharCode(currentCode);
    } else if (currentCode < 78) {
      //A-Z
      result += String.fromCharCode(currentCode + 13)
    } else {
      result += String.fromCharCode(currentCode - 13)
    }

  }
  return result;
}

console.log(rot13("SERR PBQR PNZC"));
;