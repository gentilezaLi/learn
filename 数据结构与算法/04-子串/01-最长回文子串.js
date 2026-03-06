/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：求字符串中的最长回文子串
// 思路：中心扩展，枚举中心向两边扩展
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let start = 0;
  let maxLen = 0;
  const expand = (l, r) => {
    // 从 (l,r) 向两边扩展
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1; // 当前回文长度
    if (len > maxLen) {
      maxLen = len;
      start = l + 1; // 回文起点
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i); // 奇长度中心
    expand(i, i + 1); // 偶长度中心
  }
  return s.slice(start, start + maxLen);
};
