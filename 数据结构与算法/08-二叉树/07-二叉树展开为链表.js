/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：按前序将树展开成“只有右子”的链表，原地
// 思路：递归：先展平左右，再把左链表接到根右，根左置空
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return;
  flatten(root.left);
  flatten(root.right);
  const right = root.right;
  root.right = root.left;
  root.left = null;
  let p = root;
  while (p.right) p = p.right;
  p.right = right;
};
