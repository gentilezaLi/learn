/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：最多一笔交易，求最大利润
// 思路：维护历史最低价，每天尝试“今天卖”的利润
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minP = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    minP = Math.min(minP, p);
    maxProfit = Math.max(maxProfit, p - minP);
  }
  return maxProfit;
};
