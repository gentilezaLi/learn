/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：任意两节点间最长路径的边数（可不过根）
// 思路：后序递归，返回当前节点单侧最大深度，同时用全局变量更新“经过当前节点的直径”
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let ans = 0;
  const depth = (node) => {
    if (!node) return 0;
    const l = depth(node.left);
    const r = depth(node.right);
    ans = Math.max(ans, l + r);
    return 1 + Math.max(l, r);
  };
  depth(root);
  return ans;
};
