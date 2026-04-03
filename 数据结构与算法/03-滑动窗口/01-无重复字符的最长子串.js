/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。注意 "bca" 和 "cab" 也是正确答案。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

 */

// 题意：求不含重复字符的最长连续子串的长度
// 思路：滑动窗口 + Set 记录窗口内字符
/**
 * @param {string} s 输入字符串
 * @return {number} 返回无重复字符的最长子串长度
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set(); // 当前窗口内出现的字符集合，用于快速判断字符是否重复
  let left = 0; // 窗口左边界指针，表示当前子串的起始位置
  let max = 0; // 记录目前为止找到的最长无重复子串的长度
  for (let right = 0; right < s.length; right++) {
    // 右指针 right 向右移动，作为窗口右边界，把字符逐个加入窗口
    while (set.has(s[right])) {
      // 当当前字符在窗口中已存在时，说明出现重复
      // 需要缩小窗口：从左侧开始移除字符，直到窗口中不再包含当前字符
      set.delete(s[left]); // 把左边界指向的字符移出集合
      left++; // 左边界右移一位，缩小窗口
    }
    set.add(s[right]); // 将当前右指针指向的字符加入窗口集合
    max = Math.max(max, right - left + 1); // 更新最大长度：当前窗口长度为 right - left + 1
  }
  return max; // 返回最终得到的最长无重复子串的长度
};
