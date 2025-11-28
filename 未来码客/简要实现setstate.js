// 模拟 React 内部存储组件状态的容器（全局数组，按调用顺序存状态）
let stateArr = [];
// 记录当前 useState 调用的索引（确保状态与调用顺序一一对应）
let index = 0;

// 简化版 useState 实现
function useState(initialValue) {
  // 每次调用时，用当前索引取状态（首次渲染用初始值）
  const currentIndex = index;
  stateArr[currentIndex] = stateArr[currentIndex] ?? initialValue;

  // 状态更新函数：修改对应索引的状态 + 触发组件重渲染
  function setState(newValue) {
    // 支持函数式更新（类似 React 原生逻辑）
    if (typeof newValue === "function") {
      stateArr[currentIndex] = newValue(stateArr[currentIndex]);
    } else {
      stateArr[currentIndex] = newValue;
    }
    // 模拟 React 重渲染：重置索引 + 重新执行组件
    index = 0;
    renderComponent();
  }

  // 索引自增，为下一个 useState 调用做准备
  index++;
  // 返回 [状态值, 更新函数]（与原生 useState 接口一致）
  return [stateArr[currentIndex], setState];
}

// 模拟组件渲染函数
function renderComponent() {
  console.log("组件重渲染，当前状态：", stateArr);
  // 实际 React 中会更新 DOM，这里用日志模拟
}

// 测试：模拟组件使用 useState
function DemoComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");

  console.log("当前 count:", count, "当前 name:", name);

  // 模拟用户操作触发更新
  setTimeout(() => {
    setCount((prev) => prev + 1); // 函数式更新
    setName("Simplified useState");
  }, 1000);
}

// 首次渲染组件
DemoComponent();
