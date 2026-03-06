/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

// 题意：将二叉树序列化为字符串，并能反序列化回树
// 思路：前序遍历，用特殊字符表示 null（如 "X"），按前序递归解析
/**
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return 'X';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
};

/**
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const list = data.split(',');
  let i = 0;
  const build = () => {
    if (list[i] === 'X') {
      i++;
      return null;
    }
    const node = new TreeNode(Number(list[i++]));
    node.left = build();
    node.right = build();
    return node;
  };
  return build();
};
