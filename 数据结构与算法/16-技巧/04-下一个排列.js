/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将数组重排成“下一个更大”的排列，若已是最大则重排为最小
// 思路：从右找第一个升序对 (i,j)，再从右找第一个大于 nums[i] 的 k，交换 i、k，再反转 i+1..末尾
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--; // 从右找第一个 nums[i] < nums[i+1]
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--; // 从右找第一个大于 nums[i] 的
    [nums[i], nums[j]] = [nums[j], nums[i]]; // 交换
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  } // 反转 i+1 到末尾，使其最小
};
