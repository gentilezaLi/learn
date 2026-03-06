/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：可多次交易，卖出后有一天冷冻期不能买，求最大利润
// 思路：DP 状态为 持有/不持有(冷冻)/不持有(非冷冻)
// 注：与第 45 题同名，此处用 maxProfitWithCooldown 避免覆盖；提交时改为 maxProfit 即可
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitWithCooldown = function (prices) {
  let hold = -prices[0];
  let sold = 0; // 今天卖
  let cool = 0; // 昨天卖了今天冷冻
  for (let i = 1; i < prices.length; i++) {
    const [h, s, c] = [hold, sold, cool];
    hold = Math.max(h, cool - prices[i]);
    sold = h + prices[i];
    cool = Math.max(c, s);
  }
  return Math.max(sold, cool);
};
