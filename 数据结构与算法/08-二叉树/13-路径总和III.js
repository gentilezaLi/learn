/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：二叉树中路径和等于 targetSum 的路径数量（路径为从上到下连续节点）
// 思路：前缀和 + 哈希，递归时维护根到当前节点的前缀和
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefix = new Map();
  prefix.set(0, 1);
  let count = 0;
  const dfs = (node, sum) => {
    if (!node) return;
    sum += node.val;
    count += prefix.get(sum - targetSum) || 0;
    prefix.set(sum, (prefix.get(sum) || 0) + 1);
    dfs(node.left, sum);
    dfs(node.right, sum);
    prefix.set(sum, prefix.get(sum) - 1);
  };
  dfs(root, 0);
  return count;
};
