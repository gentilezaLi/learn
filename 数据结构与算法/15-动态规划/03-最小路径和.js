/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：网格每个格子有权值，从左上到右下最小路径和
// 思路：DP，dp[i][j]=grid[i][j]+min(dp[i-1][j], dp[i][j-1])
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];
  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
  return grid[m - 1][n - 1];
};
