/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：返回二叉树中序遍历结果
// 思路：递归或迭代（栈模拟）
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const ans = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left; // 一路向左入栈
    }
    cur = stack.pop();
    ans.push(cur.val); // 左、根
    cur = cur.right; // 再右
  }
  return ans;
};
