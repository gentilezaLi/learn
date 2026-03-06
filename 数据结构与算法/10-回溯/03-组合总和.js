/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：无重复正数数组，找出和为 target 的所有组合，同一数可重复用
// 思路：回溯，从 start 开始选数，保证不重复组合（只往后选）
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  const dfs = (start, rest, path) => {
    if (rest === 0) {
      ans.push([...path]);
      return;
    }
    if (rest < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, rest - candidates[i], path); // 可重复选，所以仍从 i 开始
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
};
