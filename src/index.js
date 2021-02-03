import observe from './observe.js'
import Watcher from './Watcher.js'

let obj = {
  a: {
    m: {
      n: 30
    }
  },
  b: 5,
  g: [11, 22, 33, 44, 55]
}


observe(obj)

obj.g.push(1000)

// Watcher 就是监听数据的更改
new Watcher(obj, 'a.m.n', (val) => {
  console.log(55555, val);
})

obj.a.m.n = 20
console.log(obj);