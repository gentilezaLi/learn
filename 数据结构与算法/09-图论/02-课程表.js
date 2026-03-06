/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：能否完成所有课程（先修关系用边表示，即判有向图是否有环）
// 思路：拓扑排序 / DFS 三色标记
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const indeg = Array(numCourses).fill(0);
  const g = Array(numCourses)
    .fill(0)
    .map(() => []);
  for (const [a, b] of prerequisites) {
    g[b].push(a);
    indeg[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let count = 0;
  while (queue.length) {
    const u = queue.shift();
    count++;
    for (const v of g[u]) {
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v);
    }
  }
  return count === numCourses;
};
