/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：1..n 能组成多少种结构不同的 BST
// 思路：DP，以 i 为根时左子树个数 * 右子树个数，i 从 1 到 n 求和
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++)
    for (let j = 0; j < i; j++) dp[i] += dp[j] * dp[i - 1 - j]; // 左 j 个，右 i-1-j 个
  return dp[n];
};
