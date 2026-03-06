/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：使每个节点值变为原树中大于等于该节点值的和（反序中序）
// 思路：反序中序遍历（右-根-左），累加并写回
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let sum = 0;
  const dfs = (node) => {
    if (!node) return;
    dfs(node.right);
    sum += node.val;
    node.val = sum;
    dfs(node.left);
  };
  dfs(root);
  return root;
};
