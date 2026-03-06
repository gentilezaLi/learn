/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：按层输出节点值（二维数组）
// 思路：BFS 队列，每层记录当前层大小并出队
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const ans = [];
  const queue = [root];
  while (queue.length) {
    const n = queue.length;
    const row = [];
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      row.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    ans.push(row);
  }
  return ans;
};
