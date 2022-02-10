function rangeOfNumbers(startNum, endNum) {
  if (startNum > endNum)
    return [];
  else {
    const s = rangeOfNumbers(startNum, endNum - 1);
    s.push(endNum);
    return s;
  }
};