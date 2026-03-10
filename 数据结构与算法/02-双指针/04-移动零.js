/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]
 */

// 题意：将数组中的 0 全部移到末尾，非零相对顺序不变，原地
// 思路：双指针，非零往前写，最后补 0
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let w = 0; // 写入位置（下一个非零元素要放的下标）
  for (
    let i = 0;
    i < nums.length;
    i++ // 遍历整个数组
  )
    if (nums[i] !== 0) nums[w++] = nums[i]; // 非零则写到 w 位置并让 w 右移
  while (w < nums.length) nums[w++] = 0; // 剩余位置全部填 0
};
