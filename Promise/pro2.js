//2.初步实现then方法 

//在 then 实例方法中调用回调函数时，还要把 executor 函数中业务代码的执行结果作为参数传递进去
//那么要新增实例属性来存储业务代码的执行结果
//另外执行成功的结果通过内置方法 resolve 的参数传入，其执行失败的原因通过内置方法 reject 的参数传入

// 在这里用Symbol定义三种状态，防止外部改变状态（同步版）
// const Pending = Symbol('Pending');//进行中
// const Fuifilled = Symbol('Fuifilled');//已成功
// const Rejected = Symbol('Rejected'); // 已失败

// class Promise {
//     constructor(executor) {
//         this.status = Pending;//存储promise的状态
//         this.value = undefined;//存储executor函数中业务代码执行成功的结果
//         this.reason = undefined;//存储executor函数中业务代码执行失败的原因
//         const resolve = value => {
//             //只有状态为pending才会改变，来保证一旦状态改变就不会再变
//             if (this.status === Pending) {
//                 this.status = Fuifilled;
//                 this.value = value
//             }
//         }
//         const reject = value => {
//             //只有状态为pending才会改变，来保证一旦状态改变就不会再变
//             if (this.status === Pending) {
//                 this.status = Rejected
//                 this.value = value
//             }
//         }
//         executor(resolve, reject)
//     }
//     then(onFulfilled, onRejected) {
//         if (this.status === Fuifilled) {
//             if (onFulfilled && typeof onFulfilled === 'function') {
//                 onFulfilled(this.value)
//             }
//         }
//         if (this.status === Rejected) {
//             if (onRejected && typeof onRejected === 'function') {
//                 onRejected(this.reason)
//             }
//         }
//     }
// }

//用个测试用例验证一下：
// const test = new Promise((resolve, reject) => {
//     resolve('执行成功')
// })
// test.then(res => {
//     console.log(res)
// })

//在控制台上可以打印出 "执行成功"，但是这里只处理了同步操作的 promise
//如果在 executor 函数中传入一个异步操作的话呢

// const test2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('执行成功test2')
//     }, 1000)
// })
// test2.then(res => {
//     console.log(res)
// })

//1 秒后，会发现控制台上并没有打印出 "执行成功"，因为调用 then 实例方法时，Promise 的状态是 Pending 
//虽然1秒后 Promise 的状态变为 Fulfilled ，但是 then 实例方法已经调用过了

//那么要怎么控制 then 实例方法中回调函数的执行时机。可以用发布者——订阅者的设计模式来实现

//当调用 then 实例方法时，如果 Promise 的状态是 Pending 时，先将成功回调函数和失败回调函数分别存放起来
//在 executor 函数中异步任务执行结束，触发内置方法 resolve 或 reject，在其中去依次调用这些回调函数
//依据这个思路，再改一下代码

//在这里用Symbol定义三种状态，防止外部改变状态（异步版）
const Pending = Symbol('Pending');//进行中
const Fulfilled = Symbol('Fulfilled');//已成功
const Rejected = Symbol('Rejected');//已失败

class Promise {
    constructor(executor) {
        this.status = Pending;//存储promise状态
        this.value = undefined;//存储executor函数中业务代码执行成功的结果
        this.reason = undefined;//存储executor函数中业务代码执行失败的原因
        this.onFulfilled = [];//executor函数中业务代码执行成功回调函数的集合
        this.onRejected = [];//executor函数中业务代码执行失败回调函数的集合
        const resolve = value => {
            //只有状态为pending才会改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Fulfilled;
                this.value = value;
                //依次调用成功的回调
                this.onFulfilled.forEach(fn => fn())
            }
        }
        const reject = value => {
            //只有状态为pending才会改变，来保证一旦状态改变就不会再变
            if (this.status === Pending) {
                this.status = Rejected;
                this.reason = value;
                //依次调用失败的回调
                this.onRejected.forEach(fn => fn())
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        if (this.status === Fulfilled) {
            if (onFulfilled && typeof onFulfilled === 'function') {
                onFulfilled(this.value)
            }
        }
        if (this.status === Rejected) {
            if (onRejected && typeof onRejected === 'function') {
                onRejected(this.reason)
            }
        }
        if (this.status === Pending) {
            if (onFulfilled && typeof onFulfilled === 'function') {
                this.onFulfilled.push(() => {
                    onFulfilled(this.value)
                })
            }
            if (onRejected && typeof onRejected === 'function') {
                this.onRejected.push(() => {
                    onRejected(this.reason)
                })
            }
        }
    }
}

//再次测试
const test3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('执行成功test3，改后的promisr呦')
    }, 1000)
})
test3.then(res => {
    console.log(res)
})

//1 秒之后控制台打印出 "执行成功test3，改后的promisr呦"

//then实例方法的业务用途应该是用来添加promise状态时的回调函数
//状态变为已成功的函数通过第一个参数传递进去添加 
//状态变为已失败的函数通过第二个参数传递进去添加