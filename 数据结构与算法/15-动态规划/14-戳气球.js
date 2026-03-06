/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：一排气球分数，戳破 i 得 nums[i-1]*nums[i]*nums[i+1]，求最大得分
// 思路：区间 DP，枚举最后戳破的位置 k，左右区间独立
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let len = 2; len < n; len++)
    for (let i = 0; i + len < n; i++) {
      const j = i + len;
      for (let k = i + 1; k < j; k++)
        dp[i][j] = Math.max(dp[i][j], a[i] * a[k] * a[j] + dp[i][k] + dp[k][j]);
    }
  return dp[0][n - 1];
};
