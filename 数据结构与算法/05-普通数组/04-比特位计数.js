/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：对 0..n 每个数返回其二进制中 1 的个数
// 思路：dp[i]=dp[i>>1]+(i&1)，或 lowbit 递推
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
  return ans;
};
