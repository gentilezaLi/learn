/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：无重复数组，返回所有子集（幂集）
// 思路：回溯，每个元素选或不选；或迭代：每步在已有子集上追加新元素
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ans = [[]];
  for (const x of nums) {
    const n = ans.length;
    for (let i = 0; i < n; i++) ans.push([...ans[i], x]); // 每个已有子集加上 x
  }
  return ans;
};
