/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：连续子数组的最大乘积（有负数）
// 思路：同时维护当前最大、当前最小（负负得正）
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxP = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x;
    const b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    maxP = Math.max(maxP, curMax);
  }
  return maxP;
};
