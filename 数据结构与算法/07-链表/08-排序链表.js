/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

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
