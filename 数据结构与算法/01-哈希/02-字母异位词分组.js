/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将字母异位词分到同一组
// 思路：每组用“排序后的字符串”或“字符计数串”做 key，哈希表分组
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map(); // key: 排序后的串 或 计数串，value: 该组字符串数组
  for (const s of strs) {
    const key = [...s].sort().join(''); // 排序后作为 key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
};
