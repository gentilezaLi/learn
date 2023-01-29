const Pending = Symbol('Pending')
const FulFilled = Symbol('FulFilled')
const Rejected = Symbol('Rejected')

//handleValue函数

const handleValue = (promise, x, resolve, reject) => {
    //判断是否是循环引用
    if (promise === x) return reject(new TypeError('检测到promise链式循环引用'))
        //确保递归解析中只传递出去一次值
    let once = false
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            //防止重复读取x.then
            let then = x.then
                //判断是否是promise
            if (typeof then === 'function') {
                //调用then实例方法处理promise执行结果
                then.call(x, y => {
                    if (once) return
                    once = true
                        //防止promise中的promise执行成功后有一个promise
                        //要做递归解析
                    handleValue(promise, y, resolve, reject)
                })
            } else {
                //不是promise  就是普通对象 直接resolve
                resolve(x)
            }
        } catch (error) {
            if (once) return
            once = true
            reject(error)
        }
    } else {
        //x是一个原始值，直接resolve
        resolve(x)
    }
}

class Promise {
    constructor(params) {
        this.status = Pending
        this.value = undefined
        this.reason = undefined
        this.onFulFilled = []
        this.onRejected = []

        const resolve = value => {
            if (this.status === Pending) {
                this.status = FulFilled
                this.value = value
                this.onFulFilled.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if (this.status === Pending) {
                this.status = Rejected
                this.reason = reason
                this.onRejected.forEach(fn => fn())
            }
        }

        try {
            params(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    //then
    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise = new Promise((resolve, reject) => {
            if (this.status === FulFilled) {
                setTimeout(() => {
                    try {
                        let x = onFulFilled(this.value)
                        handleValue(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.status === Rejected) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        handleValue(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.status === Pending) {
                this.onFulFilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulFilled(this.value)
                            handleValue(promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                if (onRejected && typeof onRejected === 'function') {
                    this.onRejected.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason)
                                handleValue(promise, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        }, 0)
                    })
                }
            }
        })
        return promise;
    }

    //catch
    catch (fn) {
        return this.then(null, fn)
    }

    //静态resolve
    static resolve(params) {
        if (params instanceof Promise) {
            return params
        }
        return new Promise((resolve, reject) => {
            if (params &&
                Object.prototype.toString.call(params) === '[object object]' &&
                typeof params === 'function'
            ) {
                setTimeout((resolve, reject) => {
                    params.then()
                })
            } else {
                reject(params)
            }
        })
    }

    //静态reject
    static reject(params) {
        return new Promise((resolve, reject) => {
            reject(params)
        })
    }

    //静态all
    static all(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            let value = []
            if (length) {
                value = Array.apply(null, {
                    length: length
                })
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        value[i] = res
                        if (i === length - 1) {
                            resolve(value)
                        }
                    }, err => {
                        reject(err)
                        return
                    })
                }
            } else {
                resolve(value)
            }
        })
    }

    //静态race
    static race(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            const length = promises.length
            console.log('[ length ]', length)
            if (length) {
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                }
            } else {
                return
            }
        })
    }
}

const test = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 2000ms');
    }, 2000)
})
const test1 = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 3000ms');
    }, 3000)
})
const test2 = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 4000ms');
    }, 4000)
})

// test.then(res => {
//     console.error('res: ', res);	// res: resolve after 2000ms
// })

Promise.all([test, test1, test2]).then(res => {
        console.log('[ res ] >', res)
    })
    // Promise.race([test, test1, test2]).then(res => {
    //     console.log('[ res ] >', res)
    // })