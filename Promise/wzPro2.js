class Promise {
    constructor(params) {
        //初始化state为pending
        this.state = 'pending';
        //成功的值,返回一般都是undefined
        this.value = undefined;
        //失败的原因,返回一般都是undefined
        this.reason = undefined;
        //成功执行函数队列
        this.onResolvedCallbacks = [];
        //失败执行函数队列
        this.onRejectedCallbacks = [];

        //success
        let resolve = value => {
            if (this.state === 'pending') {
                //state change
                this.state = 'fulfilled';
                //储存成功的值
                this.value = value;
                //一旦成功，调用函数队列
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };

        //error
        let reject = reason => {
            if (this.state === 'pending') {
                //state change
                this.state = 'rejected';
                //储存成功的原因
                this.reason = reason;
                //一旦失败，调用函数队列
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        try {
            params(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err
        };
        let promise2 = new Promise((resolve, reject) => {
            //当状态是fulfilled时执行onFulfilled函数
            if (this.state === 'fulfilled') {
                //异步实现
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            //当状态是rejected时执行onRejected函数
            if (this.state === 'rejected') {
                //异步实现
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            //当状态是pending时，往onFulfilledCacks、onRejectedCacks里加入函数
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    //异步实现
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    //异步实现
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            };
        });
        return promise2;
    }
    catch(fn) {
        return this.then(null, fn);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    //循环引用报错
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    //防止多次调用
    let called;
    //判断x
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
//resolve方法
Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    });
}
//reject方法
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val);
    });
}

const test = new Promise((res, rej) => {
    setTimeout(() => {
        res('resolve after 2000ms');
    }, 2000)
})

test.then(res => {
    console.error('res: ', res);	// res: resolve after 2000ms
})