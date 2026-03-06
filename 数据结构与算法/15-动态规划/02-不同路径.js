/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：m×n 网格从左上到右下，只能向右或向下，路径数
// 思路：DP dp[i][j]=dp[i-1][j]+dp[i][j-1]，可滚动数组
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const dp = Array(n).fill(1); // 第一行全为 1
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++) dp[j] += dp[j - 1]; // 原地滚动
  return dp[n - 1];
};
