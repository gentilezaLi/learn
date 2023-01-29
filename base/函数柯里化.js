

const curry = (fn, ...args) =>
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    args.length >= fn.length // 这个判断很关键！！！
        // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
        ? fn(...args)
        //传入的参数小于原始函数fn的参数个数时
        //则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
        : (..._args) => curry(fn, ...args, ..._args);

// function add1(x, y, z) {
//     return x + y + z;
// }
// const add = curry(add1);

// console.log(add(1, 2, 3));
// console.log(add(1)(2)(3));
// console.log(add(1, 2)(3));
// console.log(add(1)(2, 3));



//两个大数相加

// let a = "9007199254740991";
// let b = "1234567899999999999";

function add(a, b) {
    //取两个数字的最大长度
    let maxLength = Math.max(a.length, b.length)
    //用0去补齐长度
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    //定义加法过程中需要用到的变量
    let t = 0
    let f = 0//进位
    let sum = ''
    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i])+parseInt(b[i]) + f
        f = Math.floor(t / 10)
        sum = t % 10 + sum
    }
    if (f == 1) {
        sum + '1' + sum
    }
    return sum
}

// console.log('[  ] >', add(a, b))

// setTimeout(() => console.log(7)); 
// setTimeout(() => console.log(8)); 

// new Promise(resolve => { 
// resolve() 
// console.log(1) 
// }).then(_ => { 
// console.log(5) 
// }) 
// console.log(2); 
// new Promise(resolve => { 
// resolve() 
// console.log(3) 
// }).then(_ => { 
// console.log(6) 
// }) 
// console.log(4)

//12345678