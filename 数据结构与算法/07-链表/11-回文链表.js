/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

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
