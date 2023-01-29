//静态方法promise.resolve()的实现

//Promise.resolve()的作用是吧传入的参数转化为一个promise对象

//1.如果参数是一个Promise实例，直接返回这个Promise实例
//2.如果参数是一个thenable对象  thenable对象指的是具有then方法的对象
let thenable = {
    then(resolve, reject) {
        resolve('韩老师')
    }
}
//promise.resolve()方法会将这个对象转化为promise对象,然后立即执行thenable方法

//3.参数不是具有then方法的对象或根本不是对象
//那么Promise.resolve()方法返回新的promise实例，状态为已成功，并把参数传递出去

//4.不带有任何参数，Promise.resolve()方法允许在调用是不带有参数而直接返回个新的Promise实例，状态为已成功

//安排
class Promise {
    //...
    static resolve(params) {
        if (params instanceof Promise) {
            return params
        }
        return new Promise((resolve, reject) => {
            if (
                params &&
                Object.prototype.toString.call(params) === '[object Object]' &&
                typeof params.then === 'function'
            ) {
                setTimeout(() => {
                    params.then(resolve, reject)
                }, 0);
            } else {
                resolve(params)
            }
        })
    }
}