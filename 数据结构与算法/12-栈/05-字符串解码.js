/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：如 "3[a2[c]]" -> "accaccacc"
// 思路：栈，遇到 ] 弹到 [ 并重复次数倍
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];
  let num = 0;
  let str = '';
  for (const c of s) {
    if (c >= '0' && c <= '9') num = num * 10 + Number(c);
    else if (c === '[') {
      stack.push([num, str]);
      num = 0;
      str = '';
    } else if (c === ']') {
      const [n, prev] = stack.pop();
      str = prev + str.repeat(n);
    } else str += c;
  }
  return str;
};
