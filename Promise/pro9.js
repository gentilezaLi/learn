//静态方法Promise.all()的实现

//promise.all()的作用是把多个Promise实例包装成一个新的Promise的实例

//例如 p=Promise.all(p1,p2,p3) 其中p1、p2、p3不是promise实例的
//内部会通过Promise.resolve()将其转化为Promise的实例  p的状态由p1、p2、p3的状态决定（分两种情况）

//1.只有p1、p2、p3的状态都变为已成功，p的状态才会变为已成功，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
//2.只要p1、p2、p3有一个状态变为已失败，p的状态就会变为失败，此时p1、p2、p3中第一个状态变为以失败的返回值会传递给p的回调函数

//安排
class Promise {
    //...
    static all(promises) {
        //将参数promises转化为一个真正的数组
        promises = Array.from(promises);
        return new Promise((resolve, reject) => {
            const length = promises.length
            let value = []
            if (length) {
                value = Array.apply(null, { length: length })
                for (let i = 0; i < length; i++) {
                    Promise.resolve(promises[i]).then(res => {
                        value[i] = res
                        if (value.length = length) {
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
}



