/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：柱状图每根柱子宽度 1，求可勾勒出的最大矩形面积
// 思路：单调栈，找每根柱子左右第一个更矮的位置
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const stack = []; // 存下标，对应高度单调增
  let maxArea = 0;
  heights.push(0); // 哨兵，保证最后全部弹出
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const h = heights[stack.pop()];
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  heights.pop();
  return maxArea;
};
