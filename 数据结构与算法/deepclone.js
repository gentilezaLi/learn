//判断是否为复杂数据类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

//利用WeekMap()的键对自己所引用都是弱引用的特性，在没有其他引用和该键引用同一对象的情况下，这个对象会被垃圾回收
//为了解决循环引用的问题，设置一个哈希表存储已拷贝过的对象进行循环检测，当检测到当前对象已存在于哈希表中时，取出该值并返回即可
const deepClone = function (obj, hash = new WeakMap()) {
    //查哈希表，防止循环拷贝。如果成环了（对象循环引用），参数obj=>obj.loop=最初的obj，则会在weekMap中找到第一次放入的obj
    if (hash.has(obj)) return hash.get(obj)

    //如果参数为Date、RegExp、Set、Map、WeakMap、WeakSet等引用类型，则直接生成一个新的实例
    let type = [Date, RegExp, Set, Map, WeakMap, WeakSet]
    if (type.includes(obj.constructor)) return new obj.constructor(obj)

    //遍历传入参数所有属性描述符
    let allDesc = Object.getOwnPropertyDescriptor(obj)

    //继承原型
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

    //获取所有的Symbol类型键
    let symKeys = Object.getOwnPropertySymbols(obj)

    //拷贝Symbol类型键对应的属性
    if (symKeys.length > 0) {
        symKeys.forEach(x => {
            cloneObj[x] = isComplexDataType(obj[x]) ? deepClone(obj[x], hash) : obj[x]
        })
    }

    //哈希表设值
    hash.set(obj, cloneObj)

    //Reflect.ownKeys(obj)拷贝不可枚举属性和符号类型
    for (let key of Reflect.ownKeys(obj)) {
        //如果值是引用类型并且非函数则递归调用deepClone
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }

    return cloneObj
}

// let obj = {
//     arr: [0, 1, 2, 3, 4, 5, 6]
// }
// let obj2 = deepClone(obj)
// obj2.str = 'flten'
// console.log('[ obj2 ] >', obj2)

// console.log('-------------');

//处理循环引用测试
let a = {
    name: 'lsz',
    course: {
        vue: 'vue.js',
        react: 'react.js'
    },
    a1: undefined,
    a2: null,
    a3: 123,
    a4: NaN
}
//对象循环引用
a.circleRef = a

let b = deepClone(a)
console.log('[ b ] >', b)