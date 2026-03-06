/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：在 s 中找包含 t 所有字符的最短子串
// 思路：滑动窗口 + 两个哈希表（need 与 window），满足条件时收缩左边界
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = new Map();
  const window = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let valid = 0;
  let start = 0;
  let len = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    while (valid === need.size) {
      if (right - left + 1 < len) {
        len = right - left + 1;
        start = left;
      }
      const d = s[left];
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
      left++;
    }
  }
  return len === Infinity ? '' : s.slice(start, start + len);
};
