/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：判断括号字符串是否合法匹配
// 思路：栈，左括号入栈，右括号与栈顶匹配
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const pair = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') stack.push(c);
    else {
      if (stack.length === 0 || stack.pop() !== pair[c]) return false;
    }
  }
  return stack.length === 0; // 栈空才说明全部匹配
};
