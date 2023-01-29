//数组扁平化就是将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]
//使用Array.prototype.flat可以直接将多层数组拍平成一层

[1, [2, [3]]].flat(2)  // [1, 2, 3]

//es5实现递归
function flatten(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res
}
console.log('flatten', flatten([1, [2, [3]]]))

//es6实现
function flatten6(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr)
    }
    return arr
}
console.log('flatten', flatten([1, [2, [3]]]))
