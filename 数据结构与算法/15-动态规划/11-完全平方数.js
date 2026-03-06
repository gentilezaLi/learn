/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将 n 表示为最少个完全平方数之和，求个数
// 思路：DP dp[i]=min(dp[i-j*j]+1)，j*j<=i
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++)
    for (let j = 1; j * j <= i; j++) dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
  return dp[n];
};
