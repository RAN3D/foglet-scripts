
const MyMap = require('./dist/test.bundle.js').MyMap
console.log(MyMap)
let map = new MyMap()
map.set('a', 2)
console.log(map.get('a'))