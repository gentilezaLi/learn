function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return res instanceof Object ? res : obj
}

function People(name, age) {
    this.age = age
    this.name = name
}

const a = myNew(People, 'apple', 12)
console.log('[ a ] >', a)
// console.log('[ Object.getPrototypeOf(a) ] >', Object.getPrototypeOf(a))


