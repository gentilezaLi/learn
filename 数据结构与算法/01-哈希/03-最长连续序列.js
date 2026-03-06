/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：未排序数组，求数值连续的最长序列长度（可乱序）
// 思路：用 Set 存所有数，只从“序列起点”开始枚举长度（即 x-1 不在 set 时）
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue; // 非起点，跳过
    let len = 0;
    let cur = x;
    while (set.has(cur)) {
      len++;
      cur++;
    }
    maxLen = Math.max(maxLen, len);
  }
  return maxLen;
};
