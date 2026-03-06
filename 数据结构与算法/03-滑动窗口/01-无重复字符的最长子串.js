/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：求不含重复字符的最长连续子串的长度
// 思路：滑动窗口 + Set 记录窗口内字符
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set(); // 当前窗口内出现的字符集合
  let left = 0; // 窗口左边界
  let max = 0; // 当前最大长度
  for (let right = 0; right < s.length; right++) {
    // right 为窗口右边界
    while (set.has(s[right])) {
      // 若右端字符已在窗口内，左边界右移直到不重复
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]); // 将当前字符加入窗口
    max = Math.max(max, right - left + 1); // 更新最大长度
  }
  return max;
};
