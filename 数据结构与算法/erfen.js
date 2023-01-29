//二分搜索

//二分搜索顾名思义，就是给数组劈开一半然后查找，如此一来就减少了数组查找次数，大大提高了性能

//首先从数组中间开始，如果命中元素那么返回结果，如果未命中，那么就比较目标值和已有值的大小
//若查找值小于中间值，则在小于中间值的那一部分执行上一步操作，反正一样，但是必须有一个条件，数组必须是有序

Array.prototype.binarySearch = function (key) {
    let low = 0
    let high = this.length - 1
    while (low <= high) {
        let mid = parseInt((low + high) / 2)
        if (key === this[mid]) {
            return mid
        } else if (key < this[mid]) {
            high = mid - 1
        } else if (key > this[mid]) {
            low = mid + 1
        } else {
            return -1
        }
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(arr.binarySearch(3))

//由于每次搜索范围都被缩小一半，那么他的时间复杂度就是O(logN)


//力扣 70题 爬梯子
function a(n) {
    const dp = new Array(n + 1)
    dp[0] = 1
    dp[1] = 2
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
}
// console.log(a(10))

//力扣 122题  贪心算法
//定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 举例输入: [7,1,5,3,6,4] 输出: 7
//解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4
//随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 

//======= 解题思路 =========
// 1、由于我们在开始之初就能拿到股票的走势数组，那么也就是我们已知股票的结果
// 2、既然已知股票结果，那么利用贪心算法的原则，我们只考虑局部最优解
// 3、只需要遍历整个数组发现是上涨的交易日，我们就进行买卖操作，下降的则不动，这样永远不会亏损
// 4、使用贪心算法的思路就是不管怎样，我不能赔钱，这样做的好处就是容易理解，如果使用动态规划，还要总结公式
let pricearr = [7, 1, 5, 3, 6, 4]
function maxprice(pricearr) {
    let ans = 0
    for (let i = 1; i < pricearr.length; ++i) {
        ans += Math.max(0, pricearr[i] - pricearr[i - 1])
    }
    return ans;
}
// console.log(maxprice(pricearr))

//力扣第一题
//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍
//给定 nums = [2, 7, 11, 15], target = 9
//因为 nums[0] + nums[1] = 2 + 7 = 9
//所以返回 [0, 1]
let num = [2, 7, 11, 15]
let target = 18
function getArrIndex(num,target){
    let obj=new Map()
    num.forEach((item,index)=>{
        obj.set(item,index)
    })
    for(let i=0;i<num.length;i++){
        let diff=target-num[i]
        if(obj.has(diff)&&i!==obj.get(diff)){
            return [i,obj.get(diff)]
        }
    }
}
console.log(getArrIndex(num,target))