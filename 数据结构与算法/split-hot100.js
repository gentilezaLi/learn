/**
 * 将 hot100.js 按题目拆分到各分类文件夹，每道题一个文件，保留注释
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 */
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const raw = fs.readFileSync(path.join(baseDir, 'hot100.js'), 'utf8');

// 题号 -> 分类文件夹（与力扣热题100学习计划对应）
const topicMap = {
  1: '哈希',           // 两数之和
  2: '链表',           // 两数相加
  3: '滑动窗口',       // 无重复字符的最长子串
  4: '二分查找',       // 寻找两个正序数组的中位数
  5: '子串',           // 最长回文子串
  6: '动态规划',       // 正则表达式匹配
  7: '双指针',         // 盛最多水的容器
  8: '双指针',         // 三数之和
  9: '回溯',           // 电话号码的字母组合
  10: '链表',          // 删除链表的倒数第 N 个结点
  11: '栈',            // 有效的括号
  12: '链表',          // 合并两个有序链表
  13: '回溯',          // 括号生成
  14: '链表',          // 合并 K 个升序链表
  15: '技巧',          // 下一个排列
  16: '栈',            // 最长有效括号
  17: '二分查找',      // 搜索旋转排序数组
  18: '二分查找',      // 在排序数组中查找元素的第一个和最后一个位置
  19: '回溯',          // 组合总和
  20: '双指针',        // 接雨水
  21: '回溯',          // 全排列
  22: '矩阵',          // 旋转图像
  23: '哈希',          // 字母异位词分组
  24: '普通数组',      // 最大子数组和
  25: '贪心算法',      // 跳跃游戏
  26: '普通数组',      // 合并区间
  27: '动态规划',      // 不同路径
  28: '动态规划',      // 最小路径和
  29: '动态规划',      // 爬楼梯
  30: '动态规划',      // 编辑距离
  31: '技巧',          // 颜色分类
  32: '滑动窗口',      // 最小覆盖子串
  33: '回溯',          // 子集
  34: '回溯',          // 单词搜索
  35: '栈',            // 柱状图中最大的矩形
  36: '矩阵',          // 最大矩形
  37: '二叉树',        // 二叉树的中序遍历
  38: '动态规划',      // 不同的二叉搜索树
  39: '二叉树',        // 验证二叉搜索树
  40: '二叉树',        // 对称二叉树
  41: '二叉树',        // 二叉树的层序遍历
  42: '二叉树',        // 二叉树的最大深度
  43: '二叉树',        // 从前序与中序遍历序列构造二叉树
  44: '二叉树',        // 二叉树展开为链表
  45: '贪心算法',      // 买卖股票的最佳时机
  46: '二叉树',        // 二叉树中的最大路径和
  47: '哈希',          // 最长连续序列
  48: '技巧',          // 只出现一次的数字
  49: '动态规划',      // 单词拆分
  50: '链表',          // 环形链表
  51: '链表',          // 环形链表 II
  52: '链表',          // LRU 缓存
  53: '链表',          // 排序链表
  54: '动态规划',      // 乘积最大子数组
  55: '栈',            // 最小栈
  56: '链表',          // 相交链表
  57: '技巧',          // 多数元素
  58: '动态规划',      // 打家劫舍
  59: '图论',          // 岛屿数量
  60: '链表',          // 反转链表
  61: '图论',          // 课程表
  62: '二叉树',        // 实现 Trie / 前缀树
  63: '堆',            // 数组中的第 K 个最大元素
  64: '动态规划',      // 最大正方形
  65: '二叉树',        // 翻转二叉树
  66: '链表',          // 回文链表
  67: '二叉树',        // 二叉树的最近公共祖先
  68: '普通数组',      // 除自身以外数组的乘积
  69: '滑动窗口',      // 滑动窗口最大值
  70: '矩阵',          // 搜索二维矩阵 II
  71: '贪心算法',      // 会议室 II
  72: '动态规划',      // 完全平方数
  73: '双指针',        // 移动零
  74: '技巧',          // 寻找重复数
  75: '二叉树',        // 二叉树的序列化与反序列化
  76: '动态规划',      // 最长递增子序列
  77: '回溯',          // 删除无效的括号
  78: '动态规划',      // 买卖股票的最佳时机含冷冻期
  79: '动态规划',      // 戳气球
  80: '动态规划',      // 零钱兑换
  81: '动态规划',      // 打家劫舍 III
  82: '普通数组',      // 比特位计数
  83: '堆',            // 前 K 个高频元素
  84: '栈',            // 字符串解码
  85: '图论',          // 除法求值
  86: '贪心算法',      // 根据身高重建队列
  87: '动态规划',      // 分割等和子集
  88: '二叉树',        // 路径总和 III
  89: '滑动窗口',      // 找到字符串中所有字母异位词
  90: '普通数组',      // 找到所有数组中消失的数字
  91: '普通数组',      // 汉明距离
  92: '动态规划',      // 目标和
  93: '二叉树',        // 把二叉搜索树转换为累加树
  94: '二叉树',        // 二叉树的直径
  95: '子串',          // 和为 K 的子数组
  96: '普通数组',      // 最短无序连续子数组
  97: '二叉树',        // 合并二叉树
  98: '贪心算法',      // 任务调度器
  99: '子串',          // 回文子串
  100: '栈',           // 每日温度
};

// 匹配每道题的块：从 "// ==================== N. 题目名" 到下一道题之前
const blockRe = /\/\/ ==================== (\d+)\. ([^\n(]+)(?: \([^)]+\))? ====================\n([\s\S]*?)(?=\n\/\/ ==================== \d+\.|$)/g;
let match;
const blocks = [];
while ((match = blockRe.exec(raw)) !== null) {
  const num = parseInt(match[1], 10);
  const title = match[2].trim();
  const code = match[3].trim();
  const folder = topicMap[num];
  if (folder) {
    blocks.push({ num, title, code, folder });
  }
}

// 文件名：题目名.js（去掉空格和斜杠）
function safeFileName(title) {
  return title.replace(/\s+/g, '').replace(/\//g, '') + '.js';
}

// 文件夹顺序（与 LeetCode 热题 100 一致），用于生成带序号的文件夹名
const folderOrder = ['哈希', '双指针', '滑动窗口', '子串', '普通数组', '矩阵', '链表', '二叉树', '图论', '回溯', '二分查找', '栈', '堆', '贪心算法', '动态规划', '技巧'];
const folderToPrefix = {};
folderOrder.forEach((name, i) => {
  folderToPrefix[name] = String(i + 1).padStart(2, '0') + '-' + name;
});
// 每个文件夹内题目顺序：按题号，技巧按 只出现一次的数字、多数元素、颜色分类、下一个排列、寻找重复数
const techniqueOrder = [48, 57, 31, 15, 74];
const folderNums = {};
folderOrder.forEach((f) => {
  folderNums[f] = [];
});
blocks.forEach(({ num, folder }) => {
  if (folderNums[folder]) folderNums[folder].push(num);
});
folderOrder.forEach((f) => {
  if (f !== '技巧') folderNums[f].sort((a, b) => a - b);
  else folderNums[f] = techniqueOrder.slice();
});

const header = `/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */
`;

blocks.forEach(({ num, title, code, folder }) => {
  const dirName = folderToPrefix[folder];
  const dir = path.join(baseDir, dirName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const idx = folderNums[folder].indexOf(num);
  const seq = String(idx + 1).padStart(2, '0');
  const fileName = seq + '-' + safeFileName(title);
  const filePath = path.join(dir, fileName);
  const content = header + '\n' + code + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${num}] ${dirName}/${fileName}`);
});

console.log('Done. Total:', blocks.length);
