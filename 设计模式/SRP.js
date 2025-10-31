// SRP 单一职责原则
// 通过解耦让每个模块职责更加独立
// 目标：一个功能模块只做一件事情

class LOLManager {
  openDialog() {
    // 复杂逻辑计算 金额计算
    //  优惠金额
    setPrice()
  }
}

const game = new LOLManager()
game.openDialog()

// 重构2

// 策略：上下分层

// 业务层
class LOLManager {
  constructor(command) {
    this.command.command
  }
  openDialog(price) {
    this.command.setPrice(price)
  }
}

// 逻辑层
class PriceManager {
  setPrice(price) {
    // 复杂逻辑计算 金额计算
    //  优惠金额
  }
}

const exe = new PriceManager()
const lol = new LOLManager(exe)
lol.openDialog(100)

// 随着需求变化 两个职责总是同时变化 没必要分离他们  ajax xhr
// 受设计模式指导
// 没必要在任何时候都一成不变的遵守规则
// 方便性 稳定性之间做一些取舍

// 前端架构
// 1. 组件 负责UI渲染
// 2. Hook 负责状态逻辑
// 3. Service 负责数据获取

// 违反SRP的组件
const UserProfile = ({ user }) => {
  // 数据获取
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts(user.id).then(setPosts)
  }, [])

  // 数据转换
  const recentPosts = posts.slice(0, 5)

  return (
    <div>
      {/* 用户信息展示 */}
      <h2>{user.name}</h2>
      <img src={user.avatar} alt="Avatar" />

      {/* 最近文章展示 */}
      <div>
        <h3>最近文章</h3>
        {recentPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// 遵循SRP的重构
// 子组件1: 用户信息展示
const UserInfo = ({ user }) => (
  <>
    <h2>{user.name}</h2>
    <img src={user.avatar} alt="Avatar" />
  </>
)

// 子组件2: 文章列表展示
const RecentPosts = ({ userId }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts(userId).then(setPosts)
  }, [userId])

  return (
    <div>
      <h3>最近文章</h3>
      {posts.slice(0, 5).map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

// 父组件: 组合
const UserProfile = ({ user }) => (
  <div>
    <UserInfo user={user} />
    <RecentPosts userId={user.id} />
  </div>
)
