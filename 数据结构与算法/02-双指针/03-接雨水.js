/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：柱状图，求下雨后能接多少水
// 思路：双指针，左右最大高度中较小的一侧决定当前列水位
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxL = 0;
  let maxR = 0;
  let water = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      maxL = Math.max(maxL, height[left]);
      water += maxL - height[left]; // 左侧最高决定当前列
      left++;
    } else {
      maxR = Math.max(maxR, height[right]);
      water += maxR - height[right];
      right--;
    }
  }
  return water;
};
