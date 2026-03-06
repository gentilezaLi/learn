/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：删除最少括号使字符串合法，返回所有可能结果
// 思路：先算需删的左右括号数，再 DFS 枚举删哪些，用 set 去重
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let leftRem = 0;
  let rightRem = 0;
  for (const c of s) {
    if (c === '(') leftRem++;
    else if (c === ')') (leftRem > 0 ? leftRem-- : rightRem++);
  }
  const set = new Set();
  const dfs = (i, left, right, leftRem, rightRem, path) => {
    if (i === s.length) {
      if (leftRem === 0 && rightRem === 0 && left === right) set.add(path);
      return;
    }
    const c = s[i];
    if (c === '(') {
      if (leftRem > 0) dfs(i + 1, left, right, leftRem - 1, rightRem, path);
      dfs(i + 1, left + 1, right, leftRem, rightRem, path + c);
    } else if (c === ')') {
      if (rightRem > 0) dfs(i + 1, left, right, leftRem, rightRem - 1, path);
      if (right < left) dfs(i + 1, left, right + 1, leftRem, rightRem, path + c);
    } else dfs(i + 1, left, right, leftRem, rightRem, path + c);
  };
  dfs(0, 0, 0, leftRem, rightRem, '');
  return [...set];
};
