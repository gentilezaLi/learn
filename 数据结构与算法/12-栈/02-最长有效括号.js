/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：求最长连续有效括号子串的长度
// 思路：栈存下标，遇 ( 入栈，遇 ) 弹栈并更新长度；或 DP
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const stack = [-1]; // 栈底放 -1 作为“未匹配的 )”的参照
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') stack.push(i);
    else {
      stack.pop();
      if (stack.length === 0) stack.push(i); // 当前 ) 无法匹配，作为新参照
      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]); // 以栈顶为起点的有效长度
    }
  }
  return maxLen;
};
