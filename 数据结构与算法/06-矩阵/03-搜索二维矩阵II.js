/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：每行每列递增的矩阵，判断 target 是否存在
// 思路：从右上角开始，大则左移，小则下移
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    const v = matrix[row][col];
    if (v === target) return true;
    if (v > target) col--;
    else row++;
  }
  return false;
};
