

function sumPrimes(num) {

  function isPrim(num1) {
    for (let i = 2; i<=Math.sqrt(num1);i++){
        if (num1%i=== 0){
          return false
        }
    }
    return true
  }

  let sum = 0;
  for (let i = 2; i <num; i++) {
    if (isPrim(i)){
      sum += i;
    }
  }
  return sum;
}

console.log(sumPrimes(10));