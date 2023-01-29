class Promise {
    constructor(params) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolved = (value) => {
            if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const rejected = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            params(resolved, rejected)
        } catch (error) {
            rejected(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return promise2;
    }

    static resolve(params) {
        if (params instanceof Promise) {
            return params
        }
        if (params &&
            Object.prototype.toString.call(params) === '[object object]' &&
            typeof params === 'function'
        ) {
            setTimeout(() => {
                params.then(resolve, reject)
            }, 0);
        } else {
            resolve(params)
        }
    }
    static reject(params) {
        return new Promise((resolve, reject) => {
            reject(params)
        })
    }


    static catch(fn) {
        return this.then.apply(null, fn)
    }

    static all(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            let length = promises.length
            let value = []
            if (length) {
                value = Array.apply(null, {
                    len: length
                })
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i].then(res => {
                        value[i] = res
                        if (value.length === length) {
                            resolve(value)
                        }
                    }, err => {
                        reject(err)
                        return
                    }))
                }
            } else {
                resolve(value)
            }
        })
    }
    static rece(promises) {
        promises = Array.from(promises)
        return new Promise((resolve, reject) => {
            let length = promises.length
            if (length) {
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i].then(res => {
                        resolve(res)
                        return
                    }, err => {
                        reject(err)
                        return
                    }))
                }
            } else {
                return
            }
        })
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if (x === promise) return reject(new TypeError('检测到promise的链式循环调用'))
    let once = false
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (once) return
                    once = true
                    resolvePromise(promise, y, resolve, reject)
                }, err => {
                    if (once) return
                    once = true
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (once) return
            once = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}

const test = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 2000ms');
    }, 2000)
})

test.then(res => {
    console.error('res: ', res);	// res: resolve after 2000ms
})