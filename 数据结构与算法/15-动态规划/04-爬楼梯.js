/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：每次可爬 1 或 2 阶，到 n 阶的方案数
// 思路：斐波那契，dp[i]=dp[i-1]+dp[i-2]
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
};
