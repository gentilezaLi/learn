//es5实现

function unique(arr) {
    let res = arr.filter(arr, (item, index) => {
        return arr.indexOf(item) === index
    })
    return res
}

//es6实现
let unique6 = arr => [...new Set(arr)]