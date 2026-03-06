/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：一排房屋，不能偷相邻的，求最大金额
// 思路：DP dp[i]=max(dp[i-1], dp[i-2]+nums[i])
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let prev = 0;
  let curr = 0;
  for (const x of nums) {
    const next = Math.max(curr, prev + x);
    prev = curr;
    curr = next;
  }
  return curr;
};
