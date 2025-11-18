<template>
  <div
    class="virtual-list-container"
    ref="containerRef"
    @scroll="handleScroll"
    :style="{ height: containerHeight + 'px', overflow: 'auto' }"
  >
    <!-- 占位元素：用于保持总高度，确保滚动条正常工作 -->
    <div
      class="virtual-list-placeholder"
      :style="{ height: totalHeight + 'px' }"
    ></div>

    <!-- 可见区域：只渲染当前可见的项目 -->
    <div
      class="virtual-list-content"
      :style="{
        transform: `translateY(${offsetY}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }"
    >
      <!-- 遍历并渲染可见的项目 -->
      <div
        v-for="item in visibleItems"
        :key="item.index"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        <!-- 使用插槽，允许外部自定义每个项目的渲染方式 -->
        <slot :item="item.data" :index="item.index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

/**
 * 虚拟列表组件
 * 
 * 核心原理：
 * 1. 只渲染可见区域的项目，而不是渲染所有数据
 * 2. 使用占位元素保持总高度，确保滚动条正常工作
 * 3. 根据滚动位置动态计算应该显示哪些项目
 * 4. 通过 transform 定位可见项目到正确位置
 * 
 * 性能优势：
 * - 无论数据量多大，DOM 节点数量始终保持在一个较小的固定值
 * - 减少内存占用和渲染时间
 * - 提升滚动流畅度
 */

// ==================== Props 定义 ====================

/**
 * 数据列表
 * @type {Array}
 */
const props = defineProps({
  // 要渲染的数据数组
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 每个项目的高度（固定高度模式）
  itemHeight: {
    type: Number,
    required: true,
    default: 50,
  },
  // 容器的高度
  containerHeight: {
    type: Number,
    default: 400,
  },
  // 缓冲区大小：在可见区域上下额外渲染的项目数量
  // 用于提升滚动时的体验，避免快速滚动时出现空白
  bufferSize: {
    type: Number,
    default: 5,
  },
})

// ==================== 响应式数据 ====================

// 容器的 DOM 引用
const containerRef = ref(null)

// 当前滚动位置
const scrollTop = ref(0)

// ==================== 计算属性 ====================

/**
 * 计算总高度
 * 总高度 = 项目数量 × 每个项目的高度
 * 这个高度用于占位元素，确保滚动条的总长度正确
 */
const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

/**
 * 计算可见区域能容纳多少个项目
 * 可见项目数 = 容器高度 / 每个项目高度 + 1（向上取整，确保完全覆盖）
 */
const visibleCount = computed(() => {
  return Math.ceil(props.containerHeight / props.itemHeight) + 1
})

/**
 * 计算起始索引
 * 根据滚动位置计算应该从第几个项目开始渲染
 * 
 * 计算逻辑：
 * 1. scrollTop / itemHeight 得到已经滚过了多少个项目
 * 2. Math.floor 向下取整，得到起始索引
 * 3. 减去 bufferSize，在可见区域上方额外渲染一些项目（缓冲区）
 * 4. Math.max(0, ...) 确保索引不为负数
 */
const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / props.itemHeight) - props.bufferSize
  return Math.max(0, index)
})

/**
 * 计算结束索引
 * 计算应该渲染到第几个项目结束
 * 
 * 计算逻辑：
 * 1. startIndex + visibleCount 得到基础结束索引
 * 2. 加上 bufferSize * 2，在可见区域下方也添加缓冲区
 * 3. Math.min(..., items.length) 确保不超过数据总数
 */
const endIndex = computed(() => {
  const index = startIndex.value + visibleCount.value + props.bufferSize * 2
  return Math.min(index, props.items.length)
})

/**
 * 计算可见项目列表
 * 只包含当前需要渲染的项目数据及其索引
 */
const visibleItems = computed(() => {
  const items = []
  for (let i = startIndex.value; i < endIndex.value; i++) {
    items.push({
      index: i,
      data: props.items[i],
    })
  }
  return items
})

/**
 * 计算垂直偏移量
 * 将可见项目定位到正确的位置
 * 
 * 计算逻辑：
 * 1. startIndex * itemHeight 得到起始项目应该距离顶部的距离
 * 2. 这个值用于 transform: translateY，将可见内容区域移动到正确位置
 */
const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

// ==================== 方法 ====================

/**
 * 处理滚动事件
 * 当用户滚动时，更新 scrollTop 值，触发计算属性重新计算可见项目
 * 
 * @param {Event} event - 滚动事件对象
 */
const handleScroll = (event) => {
  // 更新当前滚动位置
  scrollTop.value = event.target.scrollTop

  // 注意：这里不需要手动更新 DOM
  // Vue 的响应式系统会自动根据 scrollTop 的变化
  // 重新计算 startIndex、endIndex、visibleItems 等
  // 从而自动更新渲染的内容
}

/**
 * 滚动到指定索引
 * 提供外部调用的方法，可以程序化地滚动到某个项目
 * 
 * @param {Number} index - 要滚动到的项目索引
 */
const scrollToIndex = (index) => {
  if (!containerRef.value) return

  // 计算目标位置：索引 × 项目高度
  const targetScrollTop = index * props.itemHeight

  // 设置滚动位置
  containerRef.value.scrollTop = targetScrollTop
}

/**
 * 滚动到指定位置
 * 提供外部调用的方法，可以滚动到指定的像素位置
 * 
 * @param {Number} position - 要滚动到的像素位置
 */
const scrollToPosition = (position) => {
  if (!containerRef.value) return
  containerRef.value.scrollTop = position
}

// ==================== 生命周期 ====================

onMounted(() => {
  // 组件挂载后，可以在这里做一些初始化工作
  // 例如：如果需要在挂载后滚动到某个位置
})

onUnmounted(() => {
  // 组件卸载前的清理工作
  // 虚拟列表组件通常不需要特殊清理
})

// ==================== 监听器 ====================

// 监听 items 变化，如果数据更新，保持滚动位置或重置
watch(
  () => props.items.length,
  (newLength, oldLength) => {
    // 如果数据量变化，可以根据需要调整滚动位置
    // 这里可以根据实际需求实现，例如：
    // - 如果数据减少，可能需要调整 scrollTop
    // - 如果需要在数据更新后滚动到顶部，可以设置 scrollTop.value = 0
  }
)

// ==================== 暴露给外部的方法 ====================

// 使用 defineExpose 暴露方法，允许父组件通过 ref 调用
defineExpose({
  scrollToIndex,
  scrollToPosition,
  // 也可以暴露容器引用，方便外部直接操作
  containerRef,
})
</script>

<style scoped>
.virtual-list-container {
  position: relative;
  /* 相对定位，作为定位上下文 */
  width: 100%;
  /* 确保容器占满宽度 */
}

.virtual-list-placeholder {
  /* 占位元素，不可见但占据空间 */
  /* 高度由 totalHeight 动态设置 */
  width: 100%;
}

.virtual-list-content {
  /* 可见内容区域 */
  /* 使用绝对定位，通过 transform 控制位置 */
  width: 100%;
}

.virtual-list-item {
  /* 每个列表项 */
  width: 100%;
  /* 高度由 itemHeight prop 动态设置 */
  box-sizing: border-box;
  /* 确保 padding 和 border 包含在高度内 */
}

/* 可选：添加一些基础样式 */
.virtual-list-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}

/* 可选：添加 hover 效果 */
.virtual-list-item:hover {
  background-color: #f5f5f5;
}
</style>

