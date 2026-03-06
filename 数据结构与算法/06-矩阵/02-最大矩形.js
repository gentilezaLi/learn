/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：二维 0/1 矩阵，求全 1 的最大矩形面积
// 思路：每行当作柱状图底，高度为从该行向上连续 1 的个数，转成 84 题
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (!matrix.length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const heights = Array(n + 1).fill(0);
  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++)
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    const stack = [];
    for (let j = 0; j <= n; j++) {
      while (stack.length && heights[stack[stack.length - 1]] > heights[j]) {
        const h = heights[stack.pop()];
        const w = stack.length === 0 ? j : j - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, h * w);
      }
      stack.push(j);
    }
  }
  return maxArea;
};
