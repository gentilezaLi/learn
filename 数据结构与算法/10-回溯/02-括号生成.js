/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：生成 n 对括号的所有合法组合
// 思路：回溯，保证任意前缀中左括号数 >= 右括号数
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ans = [];
  const dfs = (open, close, path) => {
    if (path.length === 2 * n) {
      ans.push(path);
      return;
    }
    if (open < n) dfs(open + 1, close, path + '('); // 可加左括号
    if (close < open) dfs(open, close + 1, path + ')'); // 可加右括号
  };
  dfs(0, 0, '');
  return ans;
};
