/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将数组中的 0 全部移到末尾，非零相对顺序不变，原地
// 思路：双指针，非零往前写，最后补 0
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let w = 0; // 写入位置（下一个非零元素要放的下标）
  for (let i = 0; i < nums.length; i++) // 遍历整个数组
    if (nums[i] !== 0) nums[w++] = nums[i]; // 非零则写到 w 位置并让 w 右移
  while (w < nums.length) nums[w++] = 0; // 剩余位置全部填 0
};
