/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：求最长严格递增子序列长度（不要求连续）
// 思路：DP O(n^2)：dp[i]=max(dp[j]+1) 其中 j<i 且 nums[j]<nums[i]；或贪心+二分 O(n log n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const tails = []; // tails[i] 表示长度为 i+1 的递增子序列的最小末尾
  for (const x of nums) {
    let l = 0;
    let r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1;
      else r = m;
    }
    if (l === tails.length) tails.push(x);
    else tails[l] = x;
  }
  return tails.length;
};
