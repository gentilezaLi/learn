/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：能否将数组分成两个和相等的子集（0-1 背包）
// 思路：和为奇数必不能；否则看能否选出若干数使其和为 sum/2
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums)
    for (let j = target; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  return dp[target];
};
