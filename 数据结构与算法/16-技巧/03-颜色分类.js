/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：仅含 0,1,2 的数组，原地按 0,1,2 排序（荷兰国旗）
// 思路：双指针，0 往左换，2 往右换
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let l = 0; // 0 的右边界
  let r = nums.length - 1; // 2 的左边界
  let i = 0;
  while (i <= r) {
    if (nums[i] === 0) {
      [nums[l], nums[i]] = [nums[i], nums[l]];
      l++;
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[r]] = [nums[r], nums[i]];
      r--; // i 不增，因为换过来的可能还是 0 或 2
    } else i++;
  }
};
