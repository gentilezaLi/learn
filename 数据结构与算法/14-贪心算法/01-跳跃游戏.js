/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：数组每个位置表示可跳最远步数，问能否到达最后下标
// 思路：贪心，维护能到达的最远位置
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let far = 0; // 当前能到达的最远下标
  for (let i = 0; i < nums.length; i++) {
    if (i > far) return false; // 到不了 i
    far = Math.max(far, i + nums[i]); // 从 i 能跳到的最远
  }
  return true;
};
