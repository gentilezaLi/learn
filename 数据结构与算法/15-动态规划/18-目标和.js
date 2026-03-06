/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：给数组添加 + 或 - 使结果等于 target，求方案数
// 思路：正和 P、负和 N，P-N=target 且 P+N=sum，则 P=(sum+target)/2，转化为 0-1 背包求方案数
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  const diff = sum - target;
  if (diff < 0 || diff % 2) return 0;
  const w = diff / 2;
  const dp = Array(w + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) for (let j = w; j >= x; j--) dp[j] += dp[j - x];
  return dp[w];
};
