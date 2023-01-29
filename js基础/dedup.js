//给定一个任意数组，实现一个通用函数，让数组中的数据根据 key 排重


let data = [
    { id: 1, v: 1 },
    { id: 2, v: 2 },
    { id: 1, v: 1 },
];

// 以 id 作为排重 key，执行函数得到结果
// data = [
//   { id: 1, v: 1 },
//   { id: 2, v: 2 },
// ];

let data1 = [
    { id: 1, v: 1, id1: 1 },
    { id: 2, v: 2, id1: 2 },
    { id: 1, v: 1, id1: 1 },
]
// 以 id 和 id1 作为排重 key，执行函数得到结果
// data1 = [
//   { id: 1, v: 1, id1: 1 },
//   { id: 2, v: 2, id1: 2 },
// ];

const dedup = (data, getKey = () => { }) => {
    const dateMap = new Map()
    console.log('[ dateMap ]', dateMap)
    data.forEach(x => {
        let key = getKey(x)
        if (!Array.isArray(key)) key = [key]
        console.log('[ key ] >', key)
        key = key.map(y => JSON.stringify(y)).join(',')
        if (!dateMap.has(key)) dateMap.set(key, x)
    })
    console.log('[ dateMap ]', dateMap)
    return [...dateMap.values()]
}

console.log( dedup(data, item => [item.v]))
// console.log(dedup(data1, item => [item.id, item.id1]))