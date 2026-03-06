/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：两个整数二进制位不同的个数
// 思路：异或后统计 1 的个数
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let n = x ^ y;
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
};
