// let a = 4;
// let prom = new Promise((res, rej) => {
//    if (a > 0) {
//       let result = Math.pow(a, 3)
//       res(result)
//    } else {
//       rej('no positive number')
//    }
// })
// console.log(prom)
// prom.then((result) => {
//       console.log("result", result)
//       return 100
//    }).then((result) => {
//       console.log("result", result)
//    }).then((result) => {
//       console.log("result", result)
//    })
//    .catch((error) => {
//       console.log("error", error)
//    })




// function sqrt(num) {
//    setTimeout(() => {
//       console.log(Math.sqrt(num))
//    }, 1000)
// }

// function sum(a, b, callback) {
//    setTimeout(() => {
//       callback(a + b)
//    }, 2000)
// }
// sum(10, 20, (result) => {
//    sqrt(64)
//    console.log(result)
// })

// function sqrt(num) {
//    return new Promise((res, rej) => {
//       setTimeout(() => {
//          if (typeof num !== 'number') {
//             rej('input no number')
//          }
//          res(Math.sqrt(num))
//       }, 2000)
//    })
// }

// function sum(a, b) {
//    return new Promise((res, rej) => {
//       setTimeout(() => {
//          if (typeof a !== 'number' || typeof b !== 'number') {
//             rej('input no number')
//          }
//          res(a + b)
//       }, 1000)
//    })
// }


// Առաջին տարբերակ
// sqrt(40)
//    .then((res) => {
//       console.log(res)
//       sum(50, 30)
//          .then((res) => {
//             console.log(res)
//          })
//    })


// Երկրորդ տարբերակ
// sqrt(40)
//    .then((res) => {
//       console.log(res)
//       return sum(50, 30)
//    })
//    .then((res) => {
//       console.log(res)
//    })

// async function exam() {
//    let s1 = await sqrt(169)
//    let s2 = await sum(1, 3)
//    console.log(s1)
//    console.log(s2)
// }
// exam()

// sqrt(40)
//    .then(async (res) => {
//       console.log('sqrt', res);
//       let s = await sum(res, 20);
//       console.log('s', s)
//    })





// fetch
// fetch('https://jsonplaceholder.typicode.com/posts')
//    .then((res) => {
//       console.log(res)
//       res.json().then((posts)=>{
//          console.log(posts)
//       })
//    })

// or

// fetch('https://jsonplaceholder.typicode.com/posts')
//    .then((res) => {
//       return res.json()
//    })
//    .then((posts)=>{
//       console.log(posts)
//    })

// or

// async function getPost(){
//    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
//    let posts = await res.json();
//       console.log(posts);
// }
// getPost()

// or kombinacnum enq then-y ev async/await-y

// async function getPost() {
//    let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((res) => {
//          return res.json()
//       })
//    console.log(posts);
// }
// getPost()



let obj = {
   title: 'abcd',
   content: 'hjkh kjhk hjhlkjh '
}

fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
   })
   .then((res) => {
      return res.json()
   })
   .then((posts) => {
      console.log(posts)
   })