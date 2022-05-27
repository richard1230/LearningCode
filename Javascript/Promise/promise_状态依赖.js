const  p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject("i am in p1 reject")
  },3000)
})

const p2 = new Promise((resolve, reject)=>{
   setTimeout(()=>{
     resolve(p1)
   },1000)
})

p2.then(res=>console.log("res: "+res))
  .catch(err => console.log("err: "+err))
//err: i am in p1 reject



const  p11 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve("i am in p1 resolve")
    // reject("i am in p1 reject")
  },3000)
})

const p22= new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(p11)
  },1000)
})

p22.then(res=>console.log("res: "+res))
  .catch(err => console.log("err: "+err))
//res: i am in p1 resolve



const  p111 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve("i am in p1 resolve")
    // reject("i am in p1 reject")
  },3000)
})

const p222= new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject(p111)
  },1000)
})

p222.then(res=>console.log("res: "+res))
  .catch(err => console.log("err: "+err))
//err: [object Promise]