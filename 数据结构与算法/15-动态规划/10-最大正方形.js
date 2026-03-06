/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：0/1 矩阵中全 1 的最大正方形面积
// 思路：DP dp[i][j]=min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1（以 (i,j) 为右下角）
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  if (!matrix.length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  return maxSide * maxSide;
};
