function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("hello"));
;

function reverseString1(str) {
  let rever = "";
  for (let i = str.length - 1; i >= 0; i--) {
    rever += str[i];
  }
  return rever;
}

console.log(reverseString1("hello"));
;
