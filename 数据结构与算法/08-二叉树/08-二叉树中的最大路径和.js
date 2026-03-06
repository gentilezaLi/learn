/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：路径为任意节点到任意节点，求路径和最大值（节点值可负）
// 思路：后序递归，返回“单侧最大贡献”，同时用全局变量更新“经过根的最大路径”
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let ans = -Infinity;
  const gain = (node) => {
    if (!node) return 0;
    const l = Math.max(0, gain(node.left));   // 只取正贡献
    const r = Math.max(0, gain(node.right));
    ans = Math.max(ans, node.val + l + r);    // 经过当前节点的路径和
    return node.val + Math.max(l, r);         // 返回单侧最大贡献
  };
  gain(root);
  return ans;
};
