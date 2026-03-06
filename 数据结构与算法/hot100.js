/**
 * LeetCode 热题 HOT 100 - 答案与逐行注释
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 编号 1-100 对应题单顺序（与官网题单 2cktkvj 一致）
 *
 * 如需在本地运行，可取消下面两行的注释以定义链表/树节点：
 * function ListNode(val, next) { this.val = (val === undefined ? 0 : val); this.next = (next === undefined ? null : next); }
 * function TreeNode(val, left, right) { this.val = (val === undefined ? 0 : val); this.left = (left === undefined ? null : left); this.right = (right === undefined ? null : right); }
 */

// ==================== 1. 两数之和 (LeetCode 1) ====================
// 题意：在数组中找出和为目标值 target 的两个整数的下标
// 思路：哈希表存「值 -> 下标」，遍历时查 target - nums[i]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map(); // 哈希表：已遍历过的 值 -> 下标
  for (let i = 0; i < nums.length; i++) {
    // 当前数字
    const need = target - nums[i]; // 需要的另一个加数
    if (map.has(need)) return [map.get(need), i]; // 找到则返回两下标
    map.set(nums[i], i); // 否则将当前值及其下标存入 map
  }
  return []; // 题目保证有解，不会走到这里
};

// ==================== 2. 两数相加 (LeetCode 2) ====================
// 题意：两条链表表示两个非负整数，每位逆序存储，求和的链表
// 思路：模拟加法，维护进位 carry
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0); // 哑节点，方便统一处理头节点
  let cur = dummy; // 当前结果链表的尾节点
  let carry = 0; // 进位 0 或 1
  while (l1 || l2 || carry) {
    // 只要还有数或进位就继续
    const v1 = l1 ? l1.val : 0; // 取 l1 当前位，没有则为 0
    const v2 = l2 ? l2.val : 0; // 取 l2 当前位
    const sum = v1 + v2 + carry; // 当前位之和（含进位）
    carry = sum >= 10 ? 1 : 0; // 更新进位
    cur.next = new ListNode(sum % 10); // 当前位写入结果
    cur = cur.next; // 尾指针后移
    if (l1) l1 = l1.next; // 链表指针后移
    if (l2) l2 = l2.next;
  }
  return dummy.next; // 返回真正的头节点
};

// ==================== 3. 无重复字符的最长子串 (LeetCode 3) ====================
// 题意：求不含重复字符的最长连续子串的长度
// 思路：滑动窗口 + Set 记录窗口内字符
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set(); // 当前窗口内出现的字符集合
  let left = 0; // 窗口左边界
  let max = 0; // 当前最大长度
  for (let right = 0; right < s.length; right++) {
    // right 为窗口右边界
    while (set.has(s[right])) {
      // 若右端字符已在窗口内，左边界右移直到不重复
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]); // 将当前字符加入窗口
    max = Math.max(max, right - left + 1); // 更新最大长度
  }
  return max;
};

// ==================== 4. 寻找两个正序数组的中位数 (LeetCode 4) ====================
// 题意：两个有序数组合并后的中位数，要求 O(log(m+n))
// 思路：二分查找“第 k 小”，每次排除 k/2 个元素
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const k1 = (m + n + 1) >> 1; // 中位数位置（奇数时唯一，偶数时第一个）
  const k2 = (m + n + 2) >> 1; // 偶数时第二个中位数位置
  const getKth = (i, j, k) => {
    // 从 nums1[i..]、nums2[j..] 中找第 k 小（k 从 1 计）
    if (i >= m) return nums2[j + k - 1]; // nums1 用完，直接取 nums2
    if (j >= n) return nums1[i + k - 1]; // nums2 用完
    if (k === 1) return Math.min(nums1[i], nums2[j]); // 取较小者
    const half = k >> 1; // 每边取 k/2 个
    const a = i + half - 1 < m ? nums1[i + half - 1] : Infinity; // nums1 第 half 个
    const b = j + half - 1 < n ? nums2[j + half - 1] : Infinity;
    if (a <= b) return getKth(i + half, j, k - half); // 排除 nums1 前 half 个
    return getKth(i, j + half, k - half); // 否则排除 nums2 前 half 个
  };
  return (getKth(0, 0, k1) + getKth(0, 0, k2)) / 2; // 两个中位数取平均
};

// ==================== 5. 最长回文子串 (LeetCode 5) ====================
// 题意：求字符串中的最长回文子串
// 思路：中心扩展，枚举中心向两边扩展
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let start = 0;
  let maxLen = 0;
  const expand = (l, r) => {
    // 从 (l,r) 向两边扩展
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1; // 当前回文长度
    if (len > maxLen) {
      maxLen = len;
      start = l + 1; // 回文起点
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i); // 奇长度中心
    expand(i, i + 1); // 偶长度中心
  }
  return s.slice(start, start + maxLen);
};

// ==================== 6. 正则表达式匹配 (LeetCode 10) ====================
// 题意：实现 . 与 * 的正则匹配，* 表示前一个字符 0 次或多次
// 思路：记忆化递归 / DP，按「当前字符 + *」分情况
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const dp = (i, j) => {
    // s[i..]、p[j..] 是否匹配
    if (j === p.length) return i === s.length; // 模式用完，必须串也用完
    const first = i < s.length && (p[j] === s[i] || p[j] === '.'); // 首字符是否匹配
    if (j + 1 < p.length && p[j + 1] === '*') {
      // 下一个是 *：可匹配 0 次或多次
      return dp(i, j + 2) || (first && dp(i + 1, j)); // 0 次 或 匹配一次后继续用 *
    }
    return first && dp(i + 1, j + 1); // 普通匹配，各往后一位
  };
  return dp(0, 0);
};

// ==================== 7. 盛最多水的容器 (LeetCode 11) ====================
// 题意：若干竖线，选两条与 x 轴围成容器，求最大容积
// 思路：双指针从两端向中间，每次移动较短的那边
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxA = 0;
  while (left < right) {
    const w = right - left; // 底边宽度
    const h = Math.min(height[left], height[right]); // 高度取较短边
    maxA = Math.max(maxA, w * h); // 更新最大面积
    if (height[left] <= height[right]) left++;
    else right--; // 移动较短的一侧，才有机会得到更大面积
  }
  return maxA;
};

// ==================== 8. 三数之和 (LeetCode 15) ====================
// 题意：找出所有和为 0 的三元组，且不重复
// 思路：排序 + 固定一个数，双指针找两数之和
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b); // 排序便于去重和双指针
  const ans = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // 最小数已大于 0，后面不可能和为 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        ans.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++; // 去重
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return ans;
};

// ==================== 9. 电话号码的字母组合 (LeetCode 17) ====================
// 题意：数字串对应九宫格字母，求所有字母组合
// 思路：回溯 / BFS 枚举每一位的每种字母
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return [];
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const ans = [];
  const dfs = (idx, path) => {
    if (idx === digits.length) {
      ans.push(path);
      return;
    }
    const letters = map[digits[idx] - '0']; // 当前数字对应的字母串
    for (const c of letters) dfs(idx + 1, path + c); // 枚举每个字母
  };
  dfs(0, '');
  return ans;
};

// ==================== 10. 删除链表的倒数第 N 个结点 (LeetCode 19) ====================
// 题意：删除链表倒数第 n 个节点
// 思路：快指针先走 n 步，再一起走，慢指针停在待删前驱
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head); // 哑节点，避免删头时特判
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next; // 快指针先走 n+1 步
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next; // 删除 slow 的下一个节点
  return dummy.next;
};

// ==================== 11. 有效的括号 (LeetCode 20) ====================
// 题意：判断括号字符串是否合法匹配
// 思路：栈，左括号入栈，右括号与栈顶匹配
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const pair = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') stack.push(c);
    else {
      if (stack.length === 0 || stack.pop() !== pair[c]) return false;
    }
  }
  return stack.length === 0; // 栈空才说明全部匹配
};

// ==================== 12. 合并两个有序链表 (LeetCode 21) ====================
// 题意：将两条有序链表合并为一条有序链表
// 思路：哑节点 + 比较当前节点值，小的接上
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 || list2; // 接上剩余部分
  return dummy.next;
};

// ==================== 13. 括号生成 (LeetCode 22) ====================
// 题意：生成 n 对括号的所有合法组合
// 思路：回溯，保证任意前缀中左括号数 >= 右括号数
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ans = [];
  const dfs = (open, close, path) => {
    if (path.length === 2 * n) {
      ans.push(path);
      return;
    }
    if (open < n) dfs(open + 1, close, path + '('); // 可加左括号
    if (close < open) dfs(open, close + 1, path + ')'); // 可加右括号
  };
  dfs(0, 0, '');
  return ans;
};

// ==================== 14. 合并 K 个升序链表 (LeetCode 23) ====================
// 题意：将 k 条有序链表合并为一条
// 思路：最小堆维护 k 个表头，每次取最小接上；或两两合并
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const mergeTwo = (a, b) => {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (a && b) {
      if (a.val <= b.val) {
        cur.next = a;
        a = a.next;
      } else {
        cur.next = b;
        b = b.next;
      }
      cur = cur.next;
    }
    cur.next = a || b;
    return dummy.next;
  };
  if (lists.length === 0) return null;
  let ans = lists[0];
  for (let i = 1; i < lists.length; i++) ans = mergeTwo(ans, lists[i]); // 两两合并
  return ans;
};

// ==================== 15. 下一个排列 (LeetCode 31) ====================
// 题意：将数组重排成“下一个更大”的排列，若已是最大则重排为最小
// 思路：从右找第一个升序对 (i,j)，再从右找第一个大于 nums[i] 的 k，交换 i、k，再反转 i+1..末尾
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--; // 从右找第一个 nums[i] < nums[i+1]
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--; // 从右找第一个大于 nums[i] 的
    [nums[i], nums[j]] = [nums[j], nums[i]]; // 交换
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  } // 反转 i+1 到末尾，使其最小
};

// ==================== 16. 最长有效括号 (LeetCode 32) ====================
// 题意：求最长连续有效括号子串的长度
// 思路：栈存下标，遇 ( 入栈，遇 ) 弹栈并更新长度；或 DP
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const stack = [-1]; // 栈底放 -1 作为“未匹配的 )”的参照
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') stack.push(i);
    else {
      stack.pop();
      if (stack.length === 0) stack.push(i); // 当前 ) 无法匹配，作为新参照
      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]); // 以栈顶为起点的有效长度
    }
  }
  return maxLen;
};

// ==================== 17. 搜索旋转排序数组 (LeetCode 33) ====================
// 题意：无重复的旋转有序数组，查找 target 下标
// 思路：二分时判断 mid 在左半段还是右半段，再与 target 比较
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] >= nums[left]) {
      // 左半段有序
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
};

// ==================== 18. 在排序数组中查找元素的第一个和最后一个位置 (LeetCode 34) ====================
// 题意：非递减数组中 target 的起始和结束位置
// 思路：两次二分，分别找第一个 >= target 和第一个 > target
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const find = (lower) => {
    // lower 为 true 找第一个 >= target，否则找第一个 > target
    let l = 0;
    let r = nums.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (lower ? nums[m] < target : nums[m] <= target) l = m + 1;
      else r = m;
    }
    return l;
  };
  const left = find(true);
  const right = find(false) - 1;
  if (left <= right && nums[left] === target) return [left, right];
  return [-1, -1];
};

// ==================== 19. 组合总和 (LeetCode 39) ====================
// 题意：无重复正数数组，找出和为 target 的所有组合，同一数可重复用
// 思路：回溯，从 start 开始选数，保证不重复组合（只往后选）
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  const dfs = (start, rest, path) => {
    if (rest === 0) {
      ans.push([...path]);
      return;
    }
    if (rest < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, rest - candidates[i], path); // 可重复选，所以仍从 i 开始
      path.pop();
    }
  };
  dfs(0, target, []);
  return ans;
};

// ==================== 20. 接雨水 (LeetCode 42) ====================
// 题意：柱状图，求下雨后能接多少水
// 思路：双指针，左右最大高度中较小的一侧决定当前列水位
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxL = 0;
  let maxR = 0;
  let water = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      maxL = Math.max(maxL, height[left]);
      water += maxL - height[left]; // 左侧最高决定当前列
      left++;
    } else {
      maxR = Math.max(maxR, height[right]);
      water += maxR - height[right];
      right--;
    }
  }
  return water;
};

// ==================== 21. 全排列 (LeetCode 46) ====================
// 题意：无重复数组，返回所有排列
// 思路：回溯，用 used 标记已选，或交换法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const ans = [];
  const used = new Set();
  const dfs = (path) => {
    if (path.length === nums.length) {
      ans.push([...path]);
      return;
    }
    for (const x of nums) {
      if (used.has(x)) continue;
      used.add(x);
      path.push(x);
      dfs(path);
      path.pop();
      used.delete(x);
    }
  };
  dfs([]);
  return ans;
};

// ==================== 22. 旋转图像 (LeetCode 48) ====================
// 题意：n×n 矩阵顺时针旋转 90 度，原地
// 思路：按圈旋转，或先转置再左右翻转
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]; // 转置
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n >> 1; j++)
      [matrix[i][j], matrix[i][n - 1 - j]] = [matrix[i][n - 1 - j], matrix[i][j]]; // 每行左右翻转
};

// ==================== 23. 字母异位词分组 (LeetCode 49) ====================
// 题意：将字母异位词分到同一组
// 思路：每组用“排序后的字符串”或“字符计数串”做 key，哈希表分组
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map(); // key: 排序后的串 或 计数串，value: 该组字符串数组
  for (const s of strs) {
    const key = [...s].sort().join(''); // 排序后作为 key
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
};

// ==================== 24. 最大子数组和 (LeetCode 53) ====================
// 题意：求连续子数组的最大和
// 思路：贪心 / DP，当前和小于 0 则舍弃重开
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = 0;
  let max = -Infinity;
  for (const x of nums) {
    sum = sum > 0 ? sum + x : x; // 若当前和<=0 则从当前元素重新开始
    max = Math.max(max, sum);
  }
  return max;
};

// ==================== 25. 跳跃游戏 (LeetCode 55) ====================
// 题意：数组每个位置表示可跳最远步数，问能否到达最后下标
// 思路：贪心，维护能到达的最远位置
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let far = 0; // 当前能到达的最远下标
  for (let i = 0; i < nums.length; i++) {
    if (i > far) return false; // 到不了 i
    far = Math.max(far, i + nums[i]); // 从 i 能跳到的最远
  }
  return true;
};

// ==================== 26. 合并区间 (LeetCode 56) ====================
// 题意：合并所有重叠区间
// 思路：按左端点排序，依次合并
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const ans = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = ans[ans.length - 1];
    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]); // 重叠则合并
    else ans.push(intervals[i]);
  }
  return ans;
};

// ==================== 27. 不同路径 (LeetCode 62) ====================
// 题意：m×n 网格从左上到右下，只能向右或向下，路径数
// 思路：DP dp[i][j]=dp[i-1][j]+dp[i][j-1]，可滚动数组
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const dp = Array(n).fill(1); // 第一行全为 1
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++) dp[j] += dp[j - 1]; // 原地滚动
  return dp[n - 1];
};

// ==================== 28. 最小路径和 (LeetCode 64) ====================
// 题意：网格每个格子有权值，从左上到右下最小路径和
// 思路：DP，dp[i][j]=grid[i][j]+min(dp[i-1][j], dp[i][j-1])
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];
  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
  return grid[m - 1][n - 1];
};

// ==================== 29. 爬楼梯 (LeetCode 70) ====================
// 题意：每次可爬 1 或 2 阶，到 n 阶的方案数
// 思路：斐波那契，dp[i]=dp[i-1]+dp[i-2]
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
};

// ==================== 30. 编辑距离 (LeetCode 72) ====================
// 题意：将 word1 通过最少次插入/删除/替换变成 word2
// 思路：DP dp[i][j] 表示 word1[0..i) 到 word2[0..j) 的最少操作数
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1)
    .fill(0)
    .map((_, i) => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  return dp[m][n];
};

// ==================== 31. 颜色分类 (LeetCode 75) ====================
// 题意：仅含 0,1,2 的数组，原地按 0,1,2 排序（荷兰国旗）
// 思路：双指针，0 往左换，2 往右换
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let l = 0; // 0 的右边界
  let r = nums.length - 1; // 2 的左边界
  let i = 0;
  while (i <= r) {
    if (nums[i] === 0) {
      [nums[l], nums[i]] = [nums[i], nums[l]];
      l++;
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[r]] = [nums[r], nums[i]];
      r--; // i 不增，因为换过来的可能还是 0 或 2
    } else i++;
  }
};

// ==================== 32. 最小覆盖子串 (LeetCode 76) ====================
// 题意：在 s 中找包含 t 所有字符的最短子串
// 思路：滑动窗口 + 两个哈希表（need 与 window），满足条件时收缩左边界
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = new Map();
  const window = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let valid = 0;
  let start = 0;
  let len = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    while (valid === need.size) {
      if (right - left + 1 < len) {
        len = right - left + 1;
        start = left;
      }
      const d = s[left];
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
      left++;
    }
  }
  return len === Infinity ? '' : s.slice(start, start + len);
};

// ==================== 33. 子集 (LeetCode 78) ====================
// 题意：无重复数组，返回所有子集（幂集）
// 思路：回溯，每个元素选或不选；或迭代：每步在已有子集上追加新元素
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ans = [[]];
  for (const x of nums) {
    const n = ans.length;
    for (let i = 0; i < n; i++) ans.push([...ans[i], x]); // 每个已有子集加上 x
  }
  return ans;
};

// ==================== 34. 单词搜索 (LeetCode 79) ====================
// 题意：二维字符网格中是否存在某单词（相邻格子连续）
// 思路：对每个起点做 DFS + 回溯，用 visited 标记
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false;
    const tmp = board[i][j];
    board[i][j] = ''; // 标记已访问
    const res =
      dfs(i + 1, j, k + 1) ||
      dfs(i - 1, j, k + 1) ||
      dfs(i, j + 1, k + 1) ||
      dfs(i, j - 1, k + 1);
    board[i][j] = tmp;
    return res;
  };
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) if (dfs(i, j, 0)) return true;
  return false;
};

// ==================== 35. 柱状图中最大的矩形 (LeetCode 84) ====================
// 题意：柱状图每根柱子宽度 1，求可勾勒出的最大矩形面积
// 思路：单调栈，找每根柱子左右第一个更矮的位置
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const stack = []; // 存下标，对应高度单调增
  let maxArea = 0;
  heights.push(0); // 哨兵，保证最后全部弹出
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const h = heights[stack.pop()];
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  heights.pop();
  return maxArea;
};

// ==================== 36. 最大矩形 (LeetCode 85) ====================
// 题意：二维 0/1 矩阵，求全 1 的最大矩形面积
// 思路：每行当作柱状图底，高度为从该行向上连续 1 的个数，转成 84 题
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (!matrix.length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const heights = Array(n + 1).fill(0);
  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++)
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    const stack = [];
    for (let j = 0; j <= n; j++) {
      while (stack.length && heights[stack[stack.length - 1]] > heights[j]) {
        const h = heights[stack.pop()];
        const w = stack.length === 0 ? j : j - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, h * w);
      }
      stack.push(j);
    }
  }
  return maxArea;
};

// ==================== 37. 二叉树的中序遍历 (LeetCode 94) ====================
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

// ==================== 38. 不同的二叉搜索树 (LeetCode 96) ====================
// 题意：1..n 能组成多少种结构不同的 BST
// 思路：DP，以 i 为根时左子树个数 * 右子树个数，i 从 1 到 n 求和
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++)
    for (let j = 0; j < i; j++) dp[i] += dp[j] * dp[i - 1 - j]; // 左 j 个，右 i-1-j 个
  return dp[n];
};

// ==================== 39. 验证二叉搜索树 (LeetCode 98) ====================
// 题意：判断二叉树是否为有效 BST（左<根<右，且子树也满足）
// 思路：中序遍历看是否严格递增；或递归传 [min, max] 区间
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = -Infinity;
  const inorder = (node) => {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  };
  return inorder(root);
};

// ==================== 40. 对称二叉树 (LeetCode 101) ====================
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

// ==================== 41. 二叉树的层序遍历 (LeetCode 102) ====================
// 题意：按层输出节点值（二维数组）
// 思路：BFS 队列，每层记录当前层大小并出队
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const ans = [];
  const queue = [root];
  while (queue.length) {
    const n = queue.length;
    const row = [];
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      row.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    ans.push(row);
  }
  return ans;
};

// ==================== 42. 二叉树的最大深度 (LeetCode 104) ====================
// 题意：根节点到最远叶子节点的最长路径上的节点数
// 思路：递归 1 + max(左深度, 右深度)
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// ==================== 43. 从前序与中序遍历序列构造二叉树 (LeetCode 105) ====================
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

// ==================== 44. 二叉树展开为链表 (LeetCode 114) ====================
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

// ==================== 45. 买卖股票的最佳时机 (LeetCode 121) ====================
// 题意：最多一笔交易，求最大利润
// 思路：维护历史最低价，每天尝试“今天卖”的利润
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minP = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    minP = Math.min(minP, p);
    maxProfit = Math.max(maxProfit, p - minP);
  }
  return maxProfit;
};

// ==================== 46. 二叉树中的最大路径和 (LeetCode 124) ====================
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

// ==================== 47. 最长连续序列 (LeetCode 128) ====================
// 题意：未排序数组，求数值连续的最长序列长度（可乱序）
// 思路：用 Set 存所有数，只从“序列起点”开始枚举长度（即 x-1 不在 set 时）
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue; // 非起点，跳过
    let len = 0;
    let cur = x;
    while (set.has(cur)) {
      len++;
      cur++;
    }
    maxLen = Math.max(maxLen, len);
  }
  return maxLen;
};

// ==================== 48. 只出现一次的数字 (LeetCode 136) ====================
// 题意：非空数组除一个数出现一次外其余都出现两次，找那个数
// 思路：异或性质 a^a=0，全部异或即得单次出现的数
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (const x of nums) res ^= x;
  return res;
};

// ==================== 49. 单词拆分 (LeetCode 139) ====================
// 题意：字符串能否由 wordDict 中的单词拼接而成（可重复使用）
// 思路：DP，dp[i] 表示 s[0..i) 能否被拆分
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
  return dp[s.length];
};

// ==================== 50. 环形链表 (LeetCode 141) ====================
// 题意：判断链表是否有环
// 思路：快慢指针，相遇则有环
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

// ==================== 51. 环形链表 II (LeetCode 142) ====================
// 题意：若有环，返回环的入口节点
// 思路：快慢相遇后，一个从 head 一个从相遇点同速走，再次相遇即入口
/**
 * @param {ListNode} head
 * @return {ListNode|null}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }
  return null;
};

// ==================== 52. LRU 缓存 (LeetCode 146) ====================
// 题意：get/put，容量满时淘汰最久未使用的
// 思路：Map 保持插入顺序（或 双向链表 + 哈希表）
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cap = capacity;
  this.cache = new Map(); // 键 -> 值，Map 按插入顺序
};

LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const v = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, v); // 提到“最近使用”
  return v;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) this.cache.delete(key);
  this.cache.set(key, value);
  if (this.cache.size > this.cap) this.cache.delete(this.cache.keys().next().value); // 删最久未用
};

// ==================== 53. 排序链表 (LeetCode 148) ====================
// 题意：链表的 O(n log n) 时间、O(1) 空间排序
// 思路：归并排序，找中点用快慢指针，合并两有序链表
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if (!head || !head.next) return head;
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null;
  const left = sortList(head);
  const right = sortList(mid);
  const merge = (a, b) => {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (a && b) {
      if (a.val <= b.val) {
        cur.next = a;
        a = a.next;
      } else {
        cur.next = b;
        b = b.next;
      }
      cur = cur.next;
    }
    cur.next = a || b;
    return dummy.next;
  };
  return merge(left, right);
};

// ==================== 54. 乘积最大子数组 (LeetCode 152) ====================
// 题意：连续子数组的最大乘积（有负数）
// 思路：同时维护当前最大、当前最小（负负得正）
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxP = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x;
    const b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    maxP = Math.max(maxP, curMax);
  }
  return maxP;
};

// ==================== 55. 最小栈 (LeetCode 155) ====================
// 题意：栈支持 push、pop、top、getMin，均 O(1)
// 思路：数据栈 + 同步的“当前最小值”栈
var MinStack = function () {
  this.stack = [];
  this.minStack = []; // 与 stack 同步，存当前栈内最小值
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);
  const min = this.minStack.length ? Math.min(this.minStack[this.minStack.length - 1], val) : val;
  this.minStack.push(min);
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

// ==================== 56. 相交链表 (LeetCode 160) ====================
// 题意：两条链表可能在某节点相交，求相交节点（无环）
// 思路：双指针各走完自己再走对方，相遇即交点（等长部分抵消）
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode|null}
 */
var getIntersectionNode = function (headA, headB) {
  let a = headA;
  let b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
};

// ==================== 57. 多数元素 (LeetCode 169) ====================
// 题意：找出出现次数大于 n/2 的元素（一定存在）
// 思路：摩尔投票，不同则抵消，剩的即众数
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let count = 0;
  let cand = null;
  for (const x of nums) {
    if (count === 0) cand = x;
    count += x === cand ? 1 : -1;
  }
  return cand;
};

// ==================== 58. 打家劫舍 (LeetCode 198) ====================
// 题意：一排房屋，不能偷相邻的，求最大金额
// 思路：DP dp[i]=max(dp[i-1], dp[i-2]+nums[i])
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let prev = 0;
  let curr = 0;
  for (const x of nums) {
    const next = Math.max(curr, prev + x);
    prev = curr;
    curr = next;
  }
  return curr;
};

// ==================== 59. 岛屿数量 (LeetCode 200) ====================
// 题意：二维 0/1 网格，求 1 的连通块个数（上下左右相邻）
// 思路：DFS/BFS 遍历，每遇到 1 就整块标记并计数
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };
  let count = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
  return count;
};

// ==================== 60. 反转链表 (LeetCode 206) ====================
// 题意：将链表反转，返回新头节点
// 思路：迭代三指针 prev/cur/next，或递归
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};

// ==================== 61. 课程表 (LeetCode 207) ====================
// 题意：能否完成所有课程（先修关系用边表示，即判有向图是否有环）
// 思路：拓扑排序 / DFS 三色标记
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const indeg = Array(numCourses).fill(0);
  const g = Array(numCourses)
    .fill(0)
    .map(() => []);
  for (const [a, b] of prerequisites) {
    g[b].push(a);
    indeg[a]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let count = 0;
  while (queue.length) {
    const u = queue.shift();
    count++;
    for (const v of g[u]) {
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v);
    }
  }
  return count === numCourses;
};

// ==================== 62. 实现 Trie / 前缀树 (LeetCode 208) ====================
// 题意：实现 insert、search、startsWith
// 思路：每个节点有 children 对象和 isEnd 标记
var TrieNode = function () {
  this.children = {};
  this.isEnd = false;
};

var Trie = function () {
  this.root = new TrieNode();
};

Trie.prototype.insert = function (word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) node.children[c] = new TrieNode();
    node = node.children[c];
  }
  node.isEnd = true;
};

Trie.prototype.search = function (word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) return false;
    node = node.children[c];
  }
  return node.isEnd;
};

Trie.prototype.startsWith = function (prefix) {
  let node = this.root;
  for (const c of prefix) {
    if (!node.children[c]) return false;
    node = node.children[c];
  }
  return true;
};

// ==================== 63. 数组中的第 K 个最大元素 (LeetCode 215) ====================
// 题意：未排序数组找第 k 大的数（不是第 k 个 distinct）
// 思路：快排划分 / 堆。这里用快速选择（划分后看 k 在左还是右）
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const swap = (i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
  const partition = (l, r) => {
    const pivot = nums[r];
    let i = l;
    for (let j = l; j < r; j++) {
      if (nums[j] >= pivot) swap(i++, j);
    }
    swap(i, r);
    return i;
  };
  let left = 0;
  let right = nums.length - 1;
  const target = k - 1; // 第 k 大即排序后下标 k-1
  while (true) {
    const p = partition(left, right);
    if (p === target) return nums[p];
    if (p < target) left = p + 1;
    else right = p - 1;
  }
};

// ==================== 64. 最大正方形 (LeetCode 221) ====================
// 题意：0/1 矩阵中全 1 的最大正方形面积
// 思路：DP dp[i][j]=min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1（以 (i,j) 为右下角）
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  if (!matrix.length) return 0;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  return maxSide * maxSide;
};

// ==================== 65. 翻转二叉树 (LeetCode 226) ====================
// 题意：左右子树互换
// 思路：递归交换左右子，再递归处理左右
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
};

// ==================== 66. 回文链表 (LeetCode 234) ====================
// 题意：判断链表是否为回文，要求 O(n) 时间 O(1) 空间
// 思路：找中点，后半段反转，再与前半段比较
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const reverse = (node) => {
    let prev = null;
    while (node) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  };
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let right = reverse(slow);
  let left = head;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
};

// ==================== 67. 二叉树的最近公共祖先 (LeetCode 236) ====================
// 题意：给两个节点 p、q，求在树中的最近公共祖先
// 思路：递归：若当前为 p/q 或 null 则返回当前；否则递归左右，两边都有结果则当前为 LCA
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
};

// ==================== 68. 除自身以外数组的乘积 (LeetCode 238) ====================
// 题意：输出数组，output[i] = 除 nums[i] 外所有数的乘积，要求 O(1) 额外空间（不算输出）
// 思路：先从左到右乘出“前缀积”，再从右到左乘“后缀积”
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const ans = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    ans[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= right;
    right *= nums[i];
  }
  return ans;
};

// ==================== 69. 滑动窗口最大值 (LeetCode 239) ====================
// 题意：数组和窗口大小 k，求每个窗口内的最大值
// 思路：单调递减双端队列，队头为当前窗口最大值
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const q = []; // 存下标，对应值单调减
  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift(); // 队头滑出窗口
    if (i >= k - 1) ans.push(nums[q[0]]);
  }
  return ans;
};

// ==================== 70. 搜索二维矩阵 II (LeetCode 240) ====================
// 题意：每行每列递增的矩阵，判断 target 是否存在
// 思路：从右上角开始，大则左移，小则下移
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    const v = matrix[row][col];
    if (v === target) return true;
    if (v > target) col--;
    else row++;
  }
  return false;
};

// ==================== 71. 会议室 II (LeetCode 253) ====================
// 题意：若干会议时间区间，求最少需要多少会议室（同一时间重叠区间数）
// 思路：将开始、结束时间拆成事件排序，遇开始+1 遇结束-1，取最大值
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  const events = [];
  for (const [s, e] of intervals) {
    events.push([s, 1]);
    events.push([e, -1]);
  }
  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])); // 结束先于开始
  let cur = 0;
  let max = 0;
  for (const [, d] of events) {
    cur += d;
    max = Math.max(max, cur);
  }
  return max;
};

// ==================== 72. 完全平方数 (LeetCode 279) ====================
// 题意：将 n 表示为最少个完全平方数之和，求个数
// 思路：DP dp[i]=min(dp[i-j*j]+1)，j*j<=i
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= n; i++)
    for (let j = 1; j * j <= i; j++) dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
  return dp[n];
};

// ==================== 73. 移动零 (LeetCode 283) ====================
// 题意：将数组中的 0 全部移到末尾，非零相对顺序不变，原地
// 思路：双指针，非零往前写，最后补 0
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let w = 0; // 写入位置
  for (let i = 0; i < nums.length; i++) if (nums[i] !== 0) nums[w++] = nums[i];
  while (w < nums.length) nums[w++] = 0;
};

// ==================== 74. 寻找重复数 (LeetCode 287) ====================
// 题意：长度为 n+1 的数组，值域 1..n，有且仅有一个数重复，找它（不能改数组、O(1) 空间）
// 思路：把下标和值当作链表 next，则重复即环的入口，用快慢指针找入口
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};

// ==================== 75. 二叉树的序列化与反序列化 (LeetCode 297) ====================
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

// ==================== 76. 最长递增子序列 (LeetCode 300) ====================
// 题意：求最长严格递增子序列长度（不要求连续）
// 思路：DP O(n^2)：dp[i]=max(dp[j]+1) 其中 j<i 且 nums[j]<nums[i]；或贪心+二分 O(n log n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const tails = []; // tails[i] 表示长度为 i+1 的递增子序列的最小末尾
  for (const x of nums) {
    let l = 0;
    let r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1;
      else r = m;
    }
    if (l === tails.length) tails.push(x);
    else tails[l] = x;
  }
  return tails.length;
};

// ==================== 77. 删除无效的括号 (LeetCode 301) ====================
// 题意：删除最少括号使字符串合法，返回所有可能结果
// 思路：先算需删的左右括号数，再 DFS 枚举删哪些，用 set 去重
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let leftRem = 0;
  let rightRem = 0;
  for (const c of s) {
    if (c === '(') leftRem++;
    else if (c === ')') (leftRem > 0 ? leftRem-- : rightRem++);
  }
  const set = new Set();
  const dfs = (i, left, right, leftRem, rightRem, path) => {
    if (i === s.length) {
      if (leftRem === 0 && rightRem === 0 && left === right) set.add(path);
      return;
    }
    const c = s[i];
    if (c === '(') {
      if (leftRem > 0) dfs(i + 1, left, right, leftRem - 1, rightRem, path);
      dfs(i + 1, left + 1, right, leftRem, rightRem, path + c);
    } else if (c === ')') {
      if (rightRem > 0) dfs(i + 1, left, right, leftRem, rightRem - 1, path);
      if (right < left) dfs(i + 1, left, right + 1, leftRem, rightRem, path + c);
    } else dfs(i + 1, left, right, leftRem, rightRem, path + c);
  };
  dfs(0, 0, 0, leftRem, rightRem, '');
  return [...set];
};

// ==================== 78. 买卖股票的最佳时机含冷冻期 (LeetCode 309) ====================
// 题意：可多次交易，卖出后有一天冷冻期不能买，求最大利润
// 思路：DP 状态为 持有/不持有(冷冻)/不持有(非冷冻)
// 注：与第 45 题同名，此处用 maxProfitWithCooldown 避免覆盖；提交时改为 maxProfit 即可
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitWithCooldown = function (prices) {
  let hold = -prices[0];
  let sold = 0; // 今天卖
  let cool = 0; // 昨天卖了今天冷冻
  for (let i = 1; i < prices.length; i++) {
    const [h, s, c] = [hold, sold, cool];
    hold = Math.max(h, cool - prices[i]);
    sold = h + prices[i];
    cool = Math.max(c, s);
  }
  return Math.max(sold, cool);
};

// ==================== 79. 戳气球 (LeetCode 312) ====================
// 题意：一排气球分数，戳破 i 得 nums[i-1]*nums[i]*nums[i+1]，求最大得分
// 思路：区间 DP，枚举最后戳破的位置 k，左右区间独立
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const a = [1, ...nums, 1];
  const n = a.length;
  const dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  for (let len = 2; len < n; len++)
    for (let i = 0; i + len < n; i++) {
      const j = i + len;
      for (let k = i + 1; k < j; k++)
        dp[i][j] = Math.max(dp[i][j], a[i] * a[k] * a[j] + dp[i][k] + dp[k][j]);
    }
  return dp[0][n - 1];
};

// ==================== 80. 零钱兑换 (LeetCode 322) ====================
// 题意：用最少的硬币凑成 amount，无法则 -1
// 思路：DP dp[i]=min(dp[i-c]+1)，c 为面值
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const c of coins) if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// ==================== 81. 打家劫舍 III (LeetCode 337) ====================
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

// ==================== 82. 比特位计数 (LeetCode 338) ====================
// 题意：对 0..n 每个数返回其二进制中 1 的个数
// 思路：dp[i]=dp[i>>1]+(i&1)，或 lowbit 递推
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);
  return ans;
};

// ==================== 83. 前 K 个高频元素 (LeetCode 347) ====================
// 题意：返回出现频率前 k 高的元素
// 思路：哈希统计频率，再用小顶堆维护 k 个最大，或桶排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
  const arr = [...map.entries()].sort((a, b) => b[1] - a[1]); // 按频次降序
  return arr.slice(0, k).map(([num]) => num);
};

// ==================== 84. 字符串解码 (LeetCode 394) ====================
// 题意：如 "3[a2[c]]" -> "accaccacc"
// 思路：栈，遇到 ] 弹到 [ 并重复次数倍
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = [];
  let num = 0;
  let str = '';
  for (const c of s) {
    if (c >= '0' && c <= '9') num = num * 10 + Number(c);
    else if (c === '[') {
      stack.push([num, str]);
      num = 0;
      str = '';
    } else if (c === ']') {
      const [n, prev] = stack.pop();
      str = prev + str.repeat(n);
    } else str += c;
  }
  return str;
};

// ==================== 85. 除法求值 (LeetCode 399) ====================
// 题意：给一系列 a/b=val 的等式和查询，求查询结果（无法求则 -1）
// 思路：建图（有向带权），每个查询用 BFS/DFS 求路径权积
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const g = {};
  const add = (a, b, v) => {
    if (!g[a]) g[a] = [];
    g[a].push([b, v]);
  };
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const v = values[i];
    add(a, b, v);
    add(b, a, 1 / v);
  }
  const bfs = (start, end) => {
    if (!g[start] || !g[end]) return -1;
    const vis = new Set();
    const queue = [[start, 1]];
    vis.add(start);
    while (queue.length) {
      const [node, prod] = queue.shift();
      if (node === end) return prod;
      for (const [next, w] of g[node] || []) {
        if (vis.has(next)) continue;
        vis.add(next);
        queue.push([next, prod * w]);
      }
    }
    return -1;
  };
  return queries.map(([a, b]) => bfs(a, b));
};

// ==================== 86. 根据身高重建队列 (LeetCode 406) ====================
// 题意：people[i]=[h,k] 表示身高 h 且前面有 k 个身高>=h 的人，还原队列
// 思路：按 h 降序、k 升序排，再按 k 插入到结果数组的 k 位置
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people.sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));
  const ans = [];
  for (const p of people) ans.splice(p[1], 0, p);
  return ans;
};

// ==================== 87. 分割等和子集 (LeetCode 416) ====================
// 题意：能否将数组分成两个和相等的子集（0-1 背包）
// 思路：和为奇数必不能；否则看能否选出若干数使其和为 sum/2
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const target = sum / 2;
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums)
    for (let j = target; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  return dp[target];
};

// ==================== 88. 路径总和 III (LeetCode 437) ====================
// 题意：二叉树中路径和等于 targetSum 的路径数量（路径为从上到下连续节点）
// 思路：前缀和 + 哈希，递归时维护根到当前节点的前缀和
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefix = new Map();
  prefix.set(0, 1);
  let count = 0;
  const dfs = (node, sum) => {
    if (!node) return;
    sum += node.val;
    count += prefix.get(sum - targetSum) || 0;
    prefix.set(sum, (prefix.get(sum) || 0) + 1);
    dfs(node.left, sum);
    dfs(node.right, sum);
    prefix.set(sum, prefix.get(sum) - 1);
  };
  dfs(root, 0);
  return count;
};

// ==================== 89. 找到字符串中所有字母异位词 (LeetCode 438) ====================
// 题意：在 s 中找所有 p 的异位词子串的起始下标
// 思路：滑动窗口，用数组或 Map 比较窗口内字符频次与 p 是否一致
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  if (s.length < p.length) return [];
  const need = Array(26).fill(0);
  const window = Array(26).fill(0);
  for (const c of p) need[c.charCodeAt(0) - 97]++;
  for (let i = 0; i < p.length; i++) window[s[i].charCodeAt(0) - 97]++;
  const same = () => need.every((v, i) => v === window[i]);
  const ans = [];
  if (same()) ans.push(0);
  for (let i = p.length; i < s.length; i++) {
    window[s[i].charCodeAt(0) - 97]++;
    window[s[i - p.length].charCodeAt(0) - 97]--;
    if (same()) ans.push(i - p.length + 1);
  }
  return ans;
};

// ==================== 90. 找到所有数组中消失的数字 (LeetCode 448) ====================
// 题意：数组元素在 [1,n]，找出 [1,n] 中未出现在数组里的数
// 思路：将 nums[i] 对应下标位置取负做标记，未被打到的下标+1 即缺失数
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const ans = [];
  for (let i = 0; i < n; i++) if (nums[i] > 0) ans.push(i + 1);
  return ans;
};

// ==================== 91. 汉明距离 (LeetCode 461) ====================
// 题意：两个整数二进制位不同的个数
// 思路：异或后统计 1 的个数
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let n = x ^ y;
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
};

// ==================== 92. 目标和 (LeetCode 494) ====================
// 题意：给数组添加 + 或 - 使结果等于 target，求方案数
// 思路：正和 P、负和 N，P-N=target 且 P+N=sum，则 P=(sum+target)/2，转化为 0-1 背包求方案数
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  const diff = sum - target;
  if (diff < 0 || diff % 2) return 0;
  const w = diff / 2;
  const dp = Array(w + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) for (let j = w; j >= x; j--) dp[j] += dp[j - x];
  return dp[w];
};

// ==================== 93. 把二叉搜索树转换为累加树 (LeetCode 538) ====================
// 题意：使每个节点值变为原树中大于等于该节点值的和（反序中序）
// 思路：反序中序遍历（右-根-左），累加并写回
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let sum = 0;
  const dfs = (node) => {
    if (!node) return;
    dfs(node.right);
    sum += node.val;
    node.val = sum;
    dfs(node.left);
  };
  dfs(root);
  return root;
};

// ==================== 94. 二叉树的直径 (LeetCode 543) ====================
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

// ==================== 95. 和为 K 的子数组 (LeetCode 560) ====================
// 题意：数组中有多少连续子数组和为 k（有负数）
// 思路：前缀和 + 哈希，记录前缀和出现次数，查 prefixSum - k
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const map = new Map();
  map.set(0, 1);
  let sum = 0;
  let count = 0;
  for (const x of nums) {
    sum += x;
    count += map.get(sum - k) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
};

// ==================== 96. 最短无序连续子数组 (LeetCode 581) ====================
// 题意：找一段连续子数组，若将这段排序则整个数组有序，求这段最短长度
// 思路：从左找最后一个逆序对右边界，从右找最后一个逆序对左边界
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  let left = -1;
  let right = -1;
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < max) right = i;
    max = Math.max(max, nums[i]);
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] > min) left = i;
    min = Math.min(min, nums[i]);
  }
  return left === -1 ? 0 : right - left + 1;
};

// ==================== 97. 合并二叉树 (LeetCode 617) ====================
// 题意：两棵二叉树对应节点值相加，重叠处相加，缺的当 0
// 思路：递归合并，一方为空则返回另一方
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;
  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
};

// ==================== 98. 任务调度器 (LeetCode 621) ====================
// 题意：任务列表，同种任务需间隔 n 个时间单位，求最短完成时间
// 思路：按最多任务数分组，算 (maxCount-1)*(n+1)+同最多数的任务数，再与 len 取大
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  const count = {};
  for (const t of tasks) count[t] = (count[t] || 0) + 1;
  const maxCount = Math.max(...Object.values(count));
  let sameMax = 0;
  for (const c of Object.values(count)) if (c === maxCount) sameMax++;
  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + sameMax);
};

// ==================== 99. 回文子串 (LeetCode 647) ====================
// 题意：字符串中回文子串的个数
// 思路：中心扩展，奇偶两种中心，每次扩展成功则计数+1
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
};

// ==================== 100. 每日温度 (LeetCode 739) ====================
// 题意：对于每个位置，往后找第一个更大元素的距离，没有则为 0
// 思路：单调栈（递减），当前元素比栈顶大则栈顶出栈并记录答案
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const stack = []; // 存下标，对应温度单调减
  const ans = Array(temperatures.length).fill(0);
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop();
      ans[j] = i - j;
    }
    stack.push(i);
  }
  return ans;
};
