// console.log('你好下哈哈哈次一定下次一定下次一定!!!!!');

import axios from 'axios';

axios.get('/users/defunkt').then(({data}) => {
  console.log(data);
})