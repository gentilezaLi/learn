/*
 * @Author: your name
 * @Date: 2020-12-14 17:38:07
 * @LastEditTime: 2020-12-28 10:35:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn\数据结构与算法\zidian.js
 */
//字典

//字典 是一种以键-值对形式存储唯一数据的数据结构

//Map

// 创建一个字典
const map = new Map([
    ['a', 1],
    ['b', 2]
]);
console.log(map);

//字典的增删改查

//获取长度
console.log(map.size)

//增加key  可以是个非原始类型
console.log(map.set([1, 2], ''))
console.log(map.set('name', '李丽').set('age', 18))

//查询
console.log(map.get('name'))

// 删除
console.log(map.delete('age'))
console.log(map)

//是否含有
console.log(map.has('name'))
console.log(map.has('age'))


//  求最大的三个数 并且求出下标
// =======解题思路=======
//1、采用的是暴力求解法，那么我们可以利用字典的特点存储最大的三个值
//2、还有种比较好理解的办法利用排序
function maxThree(arr) {
    var i = 0;
    var j = 0;
    var tmp = arr[0]
    var v = 0
    var b = new Map()
    // 遍历三次分别找到最大的三个值
    while (i < 3) {
        while (j < arr.length) {
            if (tmp < arr[j] && !b.has(j)) {
                tmp = arr[j]
                v = j
            }
            j++
        }

        b.set(v, tmp)
        i++
        j = 0
        tmp = 0
    }
    console.log(b)
}
maxThree([1, 3, 4, 5, 6, 7, 9, 1, 1, 9, 2, 8, 3, 4, 5,])
