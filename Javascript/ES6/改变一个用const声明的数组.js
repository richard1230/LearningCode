const s = [5, 6, 7];
// s = [1, 2, 3];
s[2] = 45;
console.log(s);

let obj = {
  name:"FreeCodeCamp",
  review:"Awesome"
};
Object.freeze(obj);
obj.review = "bad";
obj.newProp = "Test";
console.log(obj);


