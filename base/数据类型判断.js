//typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function

//但是对于其他的都会认为是 object，比如 Null、Date 等就不行了

function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'