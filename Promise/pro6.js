//promise内部执行错误处理

//在之前的代码都没对Promise内部执行错误进行捕获
//可以用try...catch语句来捕获错误，
//把错误用内置方法触底出去reject，防止promise内部执行错误无法追踪

const Pending = Symbol('Pending');//进行中
const Fulfilled = Symbol('Fulfilled');//已成功
const Rejected = Symbol('Rejected');//已失败
const handleValue = (promise, x, resolve, reject) => {
    //循环引用，自己等待自己完成，会出错，用reject传递错误原因
    if (promise === x) return reject(new TypeError('检测到promise的链式循环引用'))

    //确保只传递出去一次值
    let once = false
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            //防止重复去读取x.then
            let then = x.then
            //判断x是否是一个promise
            if (typeof then === 'function') {
                //调用then实例方法处理promise执行结果
                then.call(x, y => {
                    if (once) return
                    once = true
                    //防止promise中promise执行成功后又传递一个promise过来
                    //要做递归解析
                    handerValue(promise, y, resolve, reject)
                }, r => {
                    if (once) return
                    once = true
                    reject(r)
                })
            } else {
                //如果x是个普通对象，直接调用resolve(x)
                resolve(x)
            }

        } catch (err) {
            if (once) return
            once = true
            reject(err)
        }
    } else {
        //如果x是个原始值，直接调用resolve(x)
        resolve(x)
    }
}

class Promise {
    constructor(exector) {
        this.status = Pending
        this.value = undefined
        this.reason = undefined
        this.onFilfilled = []
        this.onRejected = []
        const resolve = value => {
            if (this.status === Pending) {
                this.status = Fuifilled
                this.value = value
                this.onFilfilled.forEach(fn => fn())
            }
        }
        const reject = value => {
            if (this.status === Pending) {
                this.status = Rejected
                this.reason = value
                this.onRejected.forEach(fn => fn())
            }
        }
        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFilfilled, onRejected) {
        onFilfilled = typeof onFilfilled === 'function' ? onFilfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise = new Promise((resolve, reject) => {
            if (this.status === Fuifilled) {
                setTimeout(() => {
                    try {
                        let x = onFilfilled(this.value)
                        handerValue(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === Rejected) {
                if (onRejected && typeof onRejected === 'function') {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            handerValue(promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                }
            }
            if (this.status === Pending) {
                this.onFilfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFilfilled(this.value)
                            handerValue(promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                if (onRejected && typeof onRejected === 'function') {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason)
                                handerValue(promise, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        }, 0);
                    })
                }
            }
        })
        return promise
    }
}