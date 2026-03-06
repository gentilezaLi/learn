/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：判断二叉树是否为有效 BST（左<根<右，且子树也满足）
// 思路：中序遍历看是否严格递增；或递归传 [min, max] 区间
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = -Infinity;
  const inorder = (node) => {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  };
  return inorder(root);
};
