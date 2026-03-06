/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：找一段连续子数组，若将这段排序则整个数组有序，求这段最短长度
// 思路：从左找最后一个逆序对右边界，从右找最后一个逆序对左边界
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  let left = -1;
  let right = -1;
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < max) right = i;
    max = Math.max(max, nums[i]);
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > min) left = i;
    min = Math.min(min, nums[i]);
  }
  return left === -1 ? 0 : right - left + 1;
};
