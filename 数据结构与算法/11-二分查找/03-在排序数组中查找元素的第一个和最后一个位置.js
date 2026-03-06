/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：非递减数组中 target 的起始和结束位置
// 思路：两次二分，分别找第一个 >= target 和第一个 > target
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const find = (lower) => {
    // lower 为 true 找第一个 >= target，否则找第一个 > target
    let l = 0;
    let r = nums.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (lower ? nums[m] < target : nums[m] <= target) l = m + 1;
      else r = m;
    }
    return l;
  };
  const left = find(true);
  const right = find(false) - 1;
  if (left <= right && nums[left] === target) return [left, right];
  return [-1, -1];
};
