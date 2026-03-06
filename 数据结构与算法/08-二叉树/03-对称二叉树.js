/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：判断二叉树是否轴对称
// 思路：递归比较左右子树是否镜像（左的左与右的右、左的右与右的左）
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const mirror = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return mirror(p.left, q.right) && mirror(p.right, q.left);
  };
  return mirror(root.left, root.right);
};
