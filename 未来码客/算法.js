// 冒泡排序：比较相邻元素并通过多轮冒泡将最大值逐步沉底
const bubbleSort = (arr) => {
  console.time("1");
  const length = arr.length;
  if (length <= 1) return arr;
  for (let i = 0; i < length - 1; i++) {
    // 本轮会把第 i 大的数冒到右侧，末尾 i 个元素已就位
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const tamp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tamp;
      }
    }
  }
  console.timeEnd("1");
  return arr;
};
console.log(bubbleSort([6, 5, 7, 9, 3, 2]));

// 冒泡排序改进版：若某一轮没有发生交换则提前结束
const bubbleSort2 = (arr) => {
  console.time("2");
  const length = arr.length;
  if (length <= 1) return;
  for (let i = 0; i < length - 1; i++) {
    let hasChange = false;
    // 仍旧比较相邻元素，但若整轮无交换则说明数组已经有序
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const tamp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tamp;
        hasChange = true;
      }
    }
    if (!hasChange) break;
  }
  console.timeEnd("2");
  return arr;
};
console.log(bubbleSort2([6, 5, 7, 9, 3, 2]));

// 插入排序家族
// 直接插入排序：维护已排序区，将当前元素插入到合适位置
const insertSort = (arr) => {
  console.time("3");
  const length = arr.length;
  if (length <= 1) return;
  let preIndex, current;
  for (let i = 1; i < length; i++) {
    preIndex = i - 1;
    current = arr[i];
    // 将 current 与前面已排序区间的元素比较，找到插入位置
    while (preIndex >= 0 && arr[preIndex] > current) {
      // 右移比 current 大的元素，为 current 腾位置
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    if (preIndex + 1 != i) {
      arr[preIndex + 1] = current;
    }
  }
  console.timeEnd("3");
  return arr;
};
console.log(insertSort([6, 5, 7, 9, 3, 2]));

//折半插入
const binaryInsertSort = (arr) => {
  console.time("4");
  const length = arr.length;
  if (length <= 1) return;
  let current, i, j, left, right, m;
  for (let i = 1; i < length; i++) {
    left = 0;
    right = i - 1;
    current = arr[i];
    while (left <= right) {
      m = (left + right) >> 1; //Math.floor((left+right)/2)
      if (arr[i] >= arr[m]) {
        left = m + 1;
      } else {
        right = m - 1;
      }
    }

    //left>right
    for (j = i; j > left; j--) {
      arr[j] = arr[j - 1];
    }
    arr[left] = current;
  }
  console.timeEnd("4");
  return arr;
};
console.log(binaryInsertSort([6, 5, 7, 9, 3, 2]));

//选择排序
const selectSort = (arr) => {
  console.time("5");
  const length = arr.length;
  if (length <= 1) return;
  let minIndex, temp;
  for (let i = 0; i < length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  console.timeEnd("5");
  return arr;
};
console.log(selectSort([6, 5, 7, 9, 3, 2]));

//归并排序
const mergeSort = (arr) => {
  console.time("6");
  const length = arr.length;
  if (length < 2) return arr;
  let m = Math.floor(length / 2),
    left = arr.slice(0, m),
    right = arr.slice(m);

  const merge = (left, right) => {
    const result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
  };

  console.timeEnd("6");
  return merge(mergeSort(left), mergeSort(right));
};
console.log(mergeSort([6, 5, 7, 9, 3, 2]));

//快排
const quickSort = (arr) => {
  console.time("7");
  if (arr.length <= 1) return arr;
  const pivotIndex = arr.length >> 1;
  const pivot = arr[pivotIndex];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.timeEnd("7");

  return quickSort(left).concat(pivot, quickSort(right));
};
console.log(quickSort([6, 5, 7, 9, 3, 2]));
