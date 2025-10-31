// open closed principle OCP 开闭原则
// 目标：已有的场景下 对于需要扩展的进行开放 拒绝直接的功能修改
// open 不修改源代码的情况下拓展功能
// closed  核心模块一旦完成测试 就应该保持稳定 不被修改

// 暑期弹屏展示折扣活动 wukong需要进行换肤

// render
if (game === 'wukong') {
  // 换肤
} else {
}

// event
if (game === 'LOL') {
  // 弹出折扣弹框
} else {
  // 付款
}

// sprint2 部分游戏需要置灰 付款页面显示停止发售

// render
if (game === 'wukong') {
  // 换肤
} else if (game === 'xxx') {
  // 置灰
} else {
}

// event
if (game === 'LOL') {
  // 弹出折扣弹框
} else if (game === 'xxx') {
  // 停止发售
} else {
  // 付款
}

// 重构

// render
gameManager(game).setColor()

// event
gameManager(game).openDialog()

function gameManager(game) {
  return `${game}Manager`
}

const LOLManager = {
  setColor() {
    //
  },
  openDialog() {
    //
  },
}

const wukongManager = {
  setColor() {
    //
  },
  openDialog() {
    //
  },
}

const xxxManager = {
  openDialog() {
    //
  },
}

// 重构2
// 默认逻辑

class Game {
  constructor(name) {
    this.name = name
  }
  setColor() {}
  openDialog() {}
}

class LOL extends Game {
  openDialog() {
    // 弹出折扣
  }
}

class Wukong extends Game {
  setColor() {
    //
  }
}

class xxx extends Game {
  setColor() {}
  openDialog() {}
}

// React组件设计 组件拆分
// 基础组件 关闭修改
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
)

// 扩展组件
const PrimaryButton = (props) => <Button {...props} claassName="primary-btn" />

// iconbutton
const IconButton = ({ icon, ...props }) => (
  <Button {...props}>
    <Icon name={icon} />
    {props.children}
  </Button>
)

// express 中间件

const app = express()

app.use(helmet())
app.use(json())
app.use(xxx)
app.use(xxx)

// 准则：OCP 禁止修改 控制修改传播范围
