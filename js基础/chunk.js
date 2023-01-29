//实现一个 chunk 函数
/**
 * @param input
 * @param size
 * @returns {Array}
 */
// _.chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]

// _.chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]

// _.chunk(['a', 'b', 'c', 'd'], 5)
// => [['a', 'b', 'c', 'd']]

// _.chunk(['a', 'b', 'c', 'd'], 0)
// => []



function chunk(arr, size) {
    size = Math.max(size, 0)
    if (!Array.isArray(arr)) return []
    if (size < 1) return []

    const len = arr.length
    const result = []
    let start = 0
    while (start < len) {
        result.push(arr.slice(start, start + size))
        start += size
    }
    return result
}

console.log(chunk(['a', 'b', 'c', 'd'], 2) )
console.log(chunk(['a', 'b', 'c', 'd'], 3) )
console.log(chunk(['a', 'b', 'c', 'd'], 1) )