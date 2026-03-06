/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：在 s 中找所有 p 的异位词子串的起始下标
// 思路：滑动窗口，用数组或 Map 比较窗口内字符频次与 p 是否一致
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  if (s.length < p.length) return [];
  const need = Array(26).fill(0);
  const window = Array(26).fill(0);
  for (const c of p) need[c.charCodeAt(0) - 97]++;
  for (let i = 0; i < p.length; i++) window[s[i].charCodeAt(0) - 97]++;
  const same = () => need.every((v, i) => v === window[i]);
  const ans = [];
  if (same()) ans.push(0);
  for (let i = p.length; i < s.length; i++) {
    window[s[i].charCodeAt(0) - 97]++;
    window[s[i - p.length].charCodeAt(0) - 97]--;
    if (same()) ans.push(i - p.length + 1);
  }
  return ans;
};
