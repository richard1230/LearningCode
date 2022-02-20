// let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];
//
// let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];
// thatArray 会有值 ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']

function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ['learning', ...fragment, 'is', 'fun']; // 修改这一行
  return sentence;
}

console.log(spreadOut());

