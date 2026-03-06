/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：数字串对应九宫格字母，求所有字母组合
// 思路：回溯 / BFS 枚举每一位的每种字母
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return [];
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const ans = [];
  const dfs = (idx, path) => {
    if (idx === digits.length) {
      ans.push(path);
      return;
    }
    const letters = map[digits[idx] - '0']; // 当前数字对应的字母串
    for (const c of letters) dfs(idx + 1, path + c); // 枚举每个字母
  };
  dfs(0, '');
  return ans;
};
