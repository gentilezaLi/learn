/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 * 
 * 示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

解释：

在 strs 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。
示例 2:

输入: strs = [""]

输出: [[""]]

示例 3:

输入: strs = ["a"]

输出: [["a"]]


 */

// 题意：将字母异位词分到同一组
// 思路：每组用“排序后的字符串”或“字符计数串”做 key，哈希表分组
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map(); // key: 排序后的串 或 计数串，value: 该组字符串数组
  for (const s of strs) {
    // console.log(s, [...s], [...s].sort(), [...s].sort().join(""));
    const key = [...s].sort().join(""); // 排序后作为 key
    // console.log(key);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  // console.log(map); //Map(3) { 'eat' => [ 'eat', 'tea', 'ate' ], 'ant' => [ 'tan', 'nat' ], 'bat' => [ 'bat' ] }
  return [...map.values()];
};

let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// console.log(groupAnagrams(strs));

function groupAnagramsNew(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = [...s].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}
console.log(groupAnagramsNew(strs));
