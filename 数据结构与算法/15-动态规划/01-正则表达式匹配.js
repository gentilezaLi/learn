/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：实现 . 与 * 的正则匹配，* 表示前一个字符 0 次或多次
// 思路：记忆化递归 / DP，按「当前字符 + *」分情况
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const dp = (i, j) => {
    // s[i..]、p[j..] 是否匹配
    if (j === p.length) return i === s.length; // 模式用完，必须串也用完
    const first = i < s.length && (p[j] === s[i] || p[j] === '.'); // 首字符是否匹配
    if (j + 1 < p.length && p[j + 1] === '*') {
      // 下一个是 *：可匹配 0 次或多次
      return dp(i, j + 2) || (first && dp(i + 1, j)); // 0 次 或 匹配一次后继续用 *
    }
    return first && dp(i + 1, j + 1); // 普通匹配，各往后一位
  };
  return dp(0, 0);
};
