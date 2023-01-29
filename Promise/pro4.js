//实例方法then链式调用的实现

//有来个要求
//1.在实例方法then后面可以直接使用实例方法then
//2.在前面一个实例方法then返回一个值，不管是什么值，在后面一个实例方法then中都能获取到

//这种链式调用的实现很简单，在实例方法then返回一个新的Promise对象
//把实例方法then返回的值value，通过resolve(value)或者reject(value)传递出去


const Pending = Symbol('Pending');//进行中
const Fulfilled = Symbol('Fulfilled');//已成功
const Rejected = Symbol('Rejected');//已失败

class Promise {
    constructor(exector) {
        this.status = Pending
        this.value = undefined
        this.reason = undefined
        this.onFulfilled = []
        this.onRejected = []
        const resolve = value => {
            if (this.status === Pending) {
                this.status = Fuifilled
                this.value = value
                this.onFulfilled.forEach(fn => fn())
            }
        }
        const reject = value => {
            if (this.status === Pending) {
                this.status = Rejected
                this.reason = value
                this.onRejected.forEach(fn => fn())
            }
        }
        exector(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        let promise = new Promise((reslove, reject) => {
            if (this.status === Fuifilled) {
                if (onFulfilled && typeof onFulfilled === 'function') {
                    setTimeout(() => {
                        let x = onFulfilled(this.value)
                        handleValue(promise, x, reslove, reject)
                    }, 0);
                }
            }
            if (this.status === Rejected) {
                if (onRejected && typeof onRejected === 'function') {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        handleValue(promise, x, reslove, reject)
                    }, 0);
                }
            }
            if (this.status === Pending) {
                if (onFulfilled && typeof onFulfilled === 'function') {
                    this.onFulfilled.push(() => {
                        setTimeout(() => {
                            let x = onFulfilled(this.value)
                            handleValue(promise, x, reslove, reject)
                        }, 0);
                    })
                }
                if (onRejected && typeof onRejected === 'function') {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            let x = onRejected(this.reason)
                            handleValue(promise, x, reslove, reject)
                        }, 0);
                    })
                }
            }
        })
        return promise;
    }
}

//改造后的实例方法then已经可以实现链式调用了
//但还是没有实现前一个实例方法then返回的一个值，在后面一个实例方法then中能获取到
//所以在handerValue函数中实现


export function handleValue(promise, x, resolve, reject) {
    //循环引用，自己等待自己完成，会出错，用reject传递出错误原因
    if (promise === x) {
        return reject(new Error('检测到promise的链式循环引用'))
    }

    //确保只传递出去一次值
    let once = false
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        //防止重复去读取x.then
        let then = x.then
        //判断x是不是promise
        if (typeof then === 'function') {
            //调用then实例方法处理promise执行结果
            then.call(x, y => {
                if (once) return;
                once = true
                //防止promise中promise执行成功后有传递一个promise过来
                //要做递归解析
                handleValue(promise, y, resolve, reject)
            }, r => {
                if (once) return;
                once = true
                reject(r)
            })
        } else {
            //如果x是个普通对象，直接调用resolve(x)
            resolve(x)
        }
    } else {
        //如果x是个原始值，直接调用resolve(x)
        resolve(x)
    }
}

//在上面代码中，判断typeof then==='function'时其实是在判断返回的x是否是一个promise
//如果没有then函数，x即为普通值，直接返回resolve(x)
//如果有then函数，x即为一个promise，就递归解析这个promise，直到x是一个普通值作为最后的结果返回

//那么为什么用typeof then==='function'判断是否是一个promise
//而不是用 x instanceof Promise，是为了让promise更具有通用性

//所以一个thenable对象也可以看做是一个promise，thenable对象就是一个拥有then方法的对象
let thenable={
    then:function(resolve,reject){
        resolve('执行成功thenable')
    }
}
//在thenable,then方法中通过resolve传递执行成功的后果
//但是thenable对象不是通过Promise类new出来的，所以不能通过x instanceof Promise来判断是不是一个promise