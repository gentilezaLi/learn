/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：树形结构，不能偷相邻节点，求最大金额
// 思路：后序 DP，返回 [不偷当前的最大值, 偷当前的最大值]
// 注：与第 58 题同名，此处用 robIII 避免覆盖；提交时改为 rob 即可
/**
 * @param {TreeNode} root
 * @return {number}
 */
var robIII = function (root) {
  const dfs = (node) => {
    if (!node) return [0, 0];
    const [lNo, lYes] = dfs(node.left);
    const [rNo, rYes] = dfs(node.right);
    const no = Math.max(lNo, lYes) + Math.max(rNo, rYes); // 不偷当前
    const yes = node.val + lNo + rNo; // 偷当前
    return [no, yes];
  };
  const [a, b] = dfs(root);
  return Math.max(a, b);
};
