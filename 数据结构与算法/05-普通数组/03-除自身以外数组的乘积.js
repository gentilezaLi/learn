/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：输出数组，output[i] = 除 nums[i] 外所有数的乘积，要求 O(1) 额外空间（不算输出）
// 思路：先从左到右乘出“前缀积”，再从右到左乘“后缀积”
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const ans = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    ans[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= right;
    right *= nums[i];
  }
  return ans;
};
