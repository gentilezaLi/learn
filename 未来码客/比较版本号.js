//主版本号、次版本号和修订版本号

/**
 * 比较两个版本号
 * @param {string} version1 - 第一个版本号，如 "1.2.3" 或 "v1.2.3"
 * @param {string} version2 - 第二个版本号，如 "1.2.4" 或 "v1.2.4"
 * @returns {number} 返回比较结果：1 表示 version1 > version2，-1 表示 version1 < version2，0 表示相等
 * 
 * @example
 * compareVersion("1.2.3", "1.2.4") // -1
 * compareVersion("2.0.0", "1.9.9") // 1
 * compareVersion("1.2.3", "1.2.3") // 0
 * compareVersion("1.2", "1.2.0")   // 0
 */
function compareVersion(version1, version2) {
  // 移除可能的 'v' 前缀并分割版本号
  const parseVersion = (version) => {
    return version
      .replace(/^v/i, '') // 移除 'v' 或 'V' 前缀
      .split('.')
      .map(num => parseInt(num, 10) || 0); // 转换为数字，无效值默认为0
  };

  const v1 = parseVersion(version1);
  const v2 = parseVersion(version2);

  // 确保两个版本号数组长度一致（较短的补0）
  const maxLength = Math.max(v1.length, v2.length);
  while (v1.length < maxLength) v1.push(0);
  while (v2.length < maxLength) v2.push(0);

  // 逐位比较
  for (let i = 0; i < maxLength; i++) {
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }

  return 0;
}

/**
 * 判断 version1 是否大于 version2
 */
function isVersionGreater(version1, version2) {
  return compareVersion(version1, version2) > 0;
}

/**
 * 判断 version1 是否小于 version2
 */
function isVersionLess(version1, version2) {
  return compareVersion(version1, version2) < 0;
}

/**
 * 判断两个版本号是否相等
 */
function isVersionEqual(version1, version2) {
  return compareVersion(version1, version2) === 0;
}

// 测试用例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    compareVersion,
    isVersionGreater,
    isVersionLess,
    isVersionEqual
  };
}

// 示例使用
console.log('=== 版本号比较测试 ===');
console.log('compareVersion("1.2.3", "1.2.4"):', compareVersion("1.2.3", "1.2.4")); // -1
console.log('compareVersion("2.0.0", "1.9.9"):', compareVersion("2.0.0", "1.9.9")); // 1
console.log('compareVersion("1.2.3", "1.2.3"):', compareVersion("1.2.3", "1.2.3")); // 0
console.log('compareVersion("1.2", "1.2.0"):', compareVersion("1.2", "1.2.0")); // 0
console.log('compareVersion("v1.2.3", "1.2.4"):', compareVersion("v1.2.3", "1.2.4")); // -1
console.log('compareVersion("1.0.0", "1.0"):', compareVersion("1.0.0", "1.0")); // 0
console.log('compareVersion("1.2.3.4", "1.2.3"):', compareVersion("1.2.3.4", "1.2.3")); // 1