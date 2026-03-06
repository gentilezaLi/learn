/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

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
