/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：无重复数组，返回所有排列
// 思路：回溯，用 used 标记已选，或交换法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const ans = [];
  const used = new Set();
  const dfs = (path) => {
    if (path.length === nums.length) {
      ans.push([...path]);
      return;
    }
    for (const x of nums) {
      if (used.has(x)) continue;
      used.add(x);
      path.push(x);
      dfs(path);
      path.pop();
      used.delete(x);
    }
  };
  dfs([]);
  return ans;
};
