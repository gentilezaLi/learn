//拍平数组

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];

//1
//concat+递归
// function flat(arr){
//     let arrResult=[]
//     arr.forEach(x=>{
//         //判断是不是数组
//         if(Array.isArray(x)){
//             arrResult=arrResult.concat(arguments.callee(x)) //递归
//             //或者使用扩展运算符
//             //arrResult.push(...arguments.callee(x))
//         }else{
//             arrResult.push(x)
//         }
//     })
//     return arrResult;
// }
// console.log('[ flat(arr) ] >', flat(arr))

//2 用reduce实现flat函数

// 首先使用 reduce 展开一层
// arr.reduce((pre, cur) => pre.concat(cur), []);
// [1, 2, 3, 4, 1, 2, 3, [1, 2, 3, [1, 2, 3]], 5, "string", { name: "弹铁蛋同学" }];

// 用 reduce 展开一层 + 递归
// const flat = arr => {
//   return arr.reduce((pre, cur) => {
//     return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
//   }, []);
// };
// console.log(flat(arr))

//3.使用栈的思想
// function flat(arr){
//     const result=[]
//     const stack=[].concat(arr) //将数组元素拷贝至栈，直接赋值会改变原数组
//     //如果栈不为空，则循环遍历
//     while(stack.length!==0){
//         const val=stack.pop()
//         if(Array.isArray(val)){
//             stack.push(...val) //如果是数组再次入栈，并且展开一层
//         }else{
//             result.unshift(val)//如果不是数组就将其取出来放入结果数组中
//         }
//     }
//     return result
// }
// console.log('[ flat(arr) ] >', flat(arr))

//4.通过传入整数控制 拉平 层数
//reduce+递归
function flat(arr, num = 1) {
    return num > 0 ?
        arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur), [])
        :
        arr.slice()
}
console.log(flat(arr, Infinity))