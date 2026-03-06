/**
 * LeetCode 热题 100
 * 题目来源：https://leetcode.cn/studyplan/top-100-liked/
 * 以下代码每行均配有注释，便于理解。
 */

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
