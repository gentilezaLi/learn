/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：任务列表，同种任务需间隔 n 个时间单位，求最短完成时间
// 思路：按最多任务数分组，算 (maxCount-1)*(n+1)+同最多数的任务数，再与 len 取大
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  const count = {};
  for (const t of tasks) count[t] = (count[t] || 0) + 1;
  const maxCount = Math.max(...Object.values(count));
  let sameMax = 0;
  for (const c of Object.values(count)) if (c === maxCount) sameMax++;
  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + sameMax);
};
