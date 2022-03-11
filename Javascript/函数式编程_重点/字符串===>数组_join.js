function sentensify(str) {
  // 只修改这一行下面的代码

  return str.split(/\W/).join(" ")
  // 只修改这一行上面的代码
}

console.log(sentensify("May-the-force-be-with-you"));
;