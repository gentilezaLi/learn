/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：给一系列 a/b=val 的等式和查询，求查询结果（无法求则 -1）
// 思路：建图（有向带权），每个查询用 BFS/DFS 求路径权积
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const g = {};
  const add = (a, b, v) => {
    if (!g[a]) g[a] = [];
    g[a].push([b, v]);
  };
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const v = values[i];
    add(a, b, v);
    add(b, a, 1 / v);
  }
  const bfs = (start, end) => {
    if (!g[start] || !g[end]) return -1;
    const vis = new Set();
    const queue = [[start, 1]];
    vis.add(start);
    while (queue.length) {
      const [node, prod] = queue.shift();
      if (node === end) return prod;
      for (const [next, w] of g[node] || []) {
        if (vis.has(next)) continue;
        vis.add(next);
        queue.push([next, prod * w]);
      }
    }
    return -1;
  };
  return queries.map(([a, b]) => bfs(a, b));
};
