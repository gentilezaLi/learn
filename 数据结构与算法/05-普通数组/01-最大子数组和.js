/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：求连续子数组的最大和
// 思路：贪心 / DP，当前和小于 0 则舍弃重开
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = 0;
  let max = -Infinity;
  for (const x of nums) {
    sum = sum > 0 ? sum + x : x; // 若当前和<=0 则从当前元素重新开始
    max = Math.max(max, sum);
  }
  return max;
};
