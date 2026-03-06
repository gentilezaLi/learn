/**
 * 为文件夹和题目添加序号，严格按 LeetCode 热题 100 学习计划顺序
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 */
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// 题号 -> 分类（与 split-hot100.js 一致）
const topicMap = {
  1: '哈希', 2: '链表', 3: '滑动窗口', 4: '二分查找', 5: '子串', 6: '动态规划', 7: '双指针', 8: '双指针',
  9: '回溯', 10: '链表', 11: '栈', 12: '链表', 13: '回溯', 14: '链表', 15: '技巧', 16: '栈', 17: '二分查找',
  18: '二分查找', 19: '回溯', 20: '双指针', 21: '回溯', 22: '矩阵', 23: '哈希', 24: '普通数组', 25: '贪心算法',
  26: '普通数组', 27: '动态规划', 28: '动态规划', 29: '动态规划', 30: '动态规划', 31: '技巧', 32: '滑动窗口',
  33: '回溯', 34: '回溯', 35: '栈', 36: '矩阵', 37: '二叉树', 38: '动态规划', 39: '二叉树', 40: '二叉树',
  41: '二叉树', 42: '二叉树', 43: '二叉树', 44: '二叉树', 45: '贪心算法', 46: '二叉树', 47: '哈希', 48: '技巧',
  49: '动态规划', 50: '链表', 51: '链表', 52: '链表', 53: '链表', 54: '动态规划', 55: '栈', 56: '链表',
  57: '技巧', 58: '动态规划', 59: '图论', 60: '链表', 61: '图论', 62: '二叉树', 63: '堆', 64: '动态规划',
  65: '二叉树', 66: '链表', 67: '二叉树', 68: '普通数组', 69: '滑动窗口', 70: '矩阵', 71: '贪心算法', 72: '动态规划',
  73: '双指针', 74: '技巧', 75: '二叉树', 76: '动态规划', 77: '回溯', 78: '动态规划', 79: '动态规划', 80: '动态规划',
  81: '动态规划', 82: '普通数组', 83: '堆', 84: '栈', 85: '图论', 86: '贪心算法', 87: '动态规划', 88: '二叉树',
  89: '滑动窗口', 90: '普通数组', 91: '普通数组', 92: '动态规划', 93: '二叉树', 94: '二叉树', 95: '子串', 96: '普通数组',
  97: '二叉树', 98: '贪心算法', 99: '子串', 100: '栈',
};

// 题号 -> 题目标题（用于生成文件名）
const titleMap = {
  1: '两数之和', 2: '两数相加', 3: '无重复字符的最长子串', 4: '寻找两个正序数组的中位数', 5: '最长回文子串',
  6: '正则表达式匹配', 7: '盛最多水的容器', 8: '三数之和', 9: '电话号码的字母组合', 10: '删除链表的倒数第 N 个结点',
  11: '有效的括号', 12: '合并两个有序链表', 13: '括号生成', 14: '合并 K 个升序链表', 15: '下一个排列', 16: '最长有效括号',
  17: '搜索旋转排序数组', 18: '在排序数组中查找元素的第一个和最后一个位置', 19: '组合总和', 20: '接雨水', 21: '全排列',
  22: '旋转图像', 23: '字母异位词分组', 24: '最大子数组和', 25: '跳跃游戏', 26: '合并区间', 27: '不同路径', 28: '最小路径和',
  29: '爬楼梯', 30: '编辑距离', 31: '颜色分类', 32: '最小覆盖子串', 33: '子集', 34: '单词搜索', 35: '柱状图中最大的矩形',
  36: '最大矩形', 37: '二叉树的中序遍历', 38: '不同的二叉搜索树', 39: '验证二叉搜索树', 40: '对称二叉树', 41: '二叉树的层序遍历',
  42: '二叉树的最大深度', 43: '从前序与中序遍历序列构造二叉树', 44: '二叉树展开为链表', 45: '买卖股票的最佳时机', 46: '二叉树中的最大路径和',
  47: '最长连续序列', 48: '只出现一次的数字', 49: '单词拆分', 50: '环形链表', 51: '环形链表 II', 52: 'LRU 缓存', 53: '排序链表',
  54: '乘积最大子数组', 55: '最小栈', 56: '相交链表', 57: '多数元素', 58: '打家劫舍', 59: '岛屿数量', 60: '反转链表',
  61: '课程表', 62: '实现 Trie 前缀树', 63: '数组中的第 K 个最大元素', 64: '最大正方形', 65: '翻转二叉树', 66: '回文链表',
  67: '二叉树的最近公共祖先', 68: '除自身以外数组的乘积', 69: '滑动窗口最大值', 70: '搜索二维矩阵 II', 71: '会议室 II', 72: '完全平方数',
  73: '移动零', 74: '寻找重复数', 75: '二叉树的序列化与反序列化', 76: '最长递增子序列', 77: '删除无效的括号', 78: '买卖股票的最佳时机含冷冻期',
  79: '戳气球', 80: '零钱兑换', 81: '打家劫舍 III', 82: '比特位计数', 83: '前 K 个高频元素', 84: '字符串解码', 85: '除法求值',
  86: '根据身高重建队列', 87: '分割等和子集', 88: '路径总和 III', 89: '找到字符串中所有字母异位词', 90: '找到所有数组中消失的数字',
  91: '汉明距离', 92: '目标和', 93: '把二叉搜索树转换为累加树', 94: '二叉树的直径', 95: '和为 K 的子数组', 96: '最短无序连续子数组',
  97: '合并二叉树', 98: '任务调度器', 99: '回文子串', 100: '每日温度',
};

function safeFileName(title) {
  return title.replace(/\s+/g, '').replace(/\//g, '') + '.js';
}

// LeetCode 热题 100 文件夹顺序（严格按官网）
const folderOrder = [
  '哈希', '双指针', '滑动窗口', '子串', '普通数组', '矩阵', '链表', '二叉树', '图论', '回溯', '二分查找', '栈', '堆', '贪心算法', '动态规划', '技巧'
];

// 技巧 文件夹内题目顺序（按用户要求：只出现一次的数字、多数元素、颜色分类、下一个排列、寻找重复数）
const techniqueOrder = [48, 57, 31, 15, 74];

// 1. 按题号收集每个文件夹下的 (num, title)，技巧用指定顺序
const folderToNums = {};
for (let num = 1; num <= 100; num++) {
  const folder = topicMap[num];
  if (!folder) continue;
  if (!folderToNums[folder]) folderToNums[folder] = [];
  folderToNums[folder].push(num);
}
// 技巧改为指定顺序
folderToNums['技巧'] = techniqueOrder;

// 2. 重命名文件：每个文件夹内按顺序 01-xxx.js, 02-xxx.js
folderOrder.forEach((folder) => {
  const dir = path.join(baseDir, folder);
  if (!fs.existsSync(dir)) return;
  let nums = folderToNums[folder].slice();
  if (folder !== '技巧') nums.sort((a, b) => a - b);
  else nums = techniqueOrder.slice();
  nums.forEach((num, index) => {
    const title = titleMap[num];
    const baseName = safeFileName(title);
    let oldPath = path.join(dir, baseName);
    if (!fs.existsSync(oldPath)) {
      // 可能已有序号前缀 01-xxx.js
      const files = fs.readdirSync(dir);
      const found = files.find((f) => f === baseName || f.endsWith('-' + baseName));
      if (found) oldPath = path.join(dir, found);
      else {
        console.warn('Skip (not found):', baseName, 'in', dir);
        return;
      }
    }
    const seq = String(index + 1).padStart(2, '0');
    const newName = seq + '-' + baseName;
    const newPath = path.join(dir, newName);
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`${folder}: ${baseName} -> ${newName}`);
    }
  });
});

// 3. 重命名文件夹：先改为临时名避免冲突，再改为带序号
const tempPrefix = 'temp_';
folderOrder.forEach((folder, index) => {
  const oldPath = path.join(baseDir, folder);
  if (!fs.existsSync(oldPath)) return;
  const seq = String(index + 1).padStart(2, '0');
  const newName = seq + '-' + folder;
  const newPath = path.join(baseDir, newName);
  if (oldPath === newPath) return;
  const tempPath = path.join(baseDir, tempPrefix + folder);
  fs.renameSync(oldPath, tempPath);
  console.log('Folder:', folder, '->', newName);
});
folderOrder.forEach((folder, index) => {
  const tempPath = path.join(baseDir, tempPrefix + folder);
  if (!fs.existsSync(tempPath)) return;
  const seq = String(index + 1).padStart(2, '0');
  const newPath = path.join(baseDir, seq + '-' + folder);
  fs.renameSync(tempPath, newPath);
});

console.log('Done. Folders and files now have order prefixes.');
