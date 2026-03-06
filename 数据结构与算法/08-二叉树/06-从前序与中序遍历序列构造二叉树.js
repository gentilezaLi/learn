/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：根据前序 + 中序唯一构造二叉树
// 思路：前序首为根，在中序中找到根位置，划分左右子树递归
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const map = new Map();
  inorder.forEach((v, i) => map.set(v, i));
  const build = (pL, pR, iL, iR) => {
    if (pL > pR) return null;
    const root = new TreeNode(preorder[pL]);
    const mid = map.get(preorder[pL]);
    const leftLen = mid - iL;
    root.left = build(pL + 1, pL + leftLen, iL, mid - 1);
    root.right = build(pL + leftLen + 1, pR, mid + 1, iR);
    return root;
  };
  return build(0, preorder.length - 1, 0, inorder.length - 1);
};
