function urlSlug(title) {

 return title.split(/\s+/).filter(str=>str!=="").map(alph=>alph.toLowerCase()).join("-")
}
// 只修改这一行上面的代码
console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"));

//urlSlug(" Winter Is  Coming") 应返回 winter-is-coming。



