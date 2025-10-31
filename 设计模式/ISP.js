// ISP 接口隔离原则
// 目标：多个专业的接口 比单个大而全接口好用
// 胖肚接口

// 开发游戏 游戏中台 快速生产游戏
class Game {
  constructor(name) {
    this.name = name
  }

  run() {
    // 跑
  }
  shot() {
    // 开枪
  }
  mega() {
    // 开大
  }
}

class LOL extends Game {
  constructor() {}
}

class Wukong extends Game {
  constructor() {}
}

class PUBG extends Game {
  constructor() {}
}

const pubg1 = new PUBG('pubg')
pubg1.run()
pubg1.mega()

// 重构
class Game {
  constructor(name) {
    this.name = name
  }
  run() {}
}

class Moba {
  constructor() {}
  maga() {}
}

class LOL extends Game {
  constructor() {}
  mega() {}
}

class PUBG extends Game {
  constructor() {}
  shot() {}
}

// React 组件场景中
// 违反ISP的臃肿Props
interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
  onFollow: () => void;
  showActions?: boolean;
  showStats?: boolean;
  // ...20多个props
}

// 遵循ISP的重构
interface UserInfoProps {
  user: User;
  showStats?: boolean;
}

interface UserActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onFollow: () => void;
}

// 组件拆分
const UserInfo = ({ user, showStats }: UserInfoProps) => (
  <div>{/* 用户信息展示 */}</div>
)

const UserActions = ({ onEdit, onDelete, onFollow }: UserActionsProps) => (
  <div>{/* 操作按钮 */}</div>
)

// 组合使用
const UserProfile = ({ user }) => (
  <div>
    <UserInfo user={user} showStats />
    <UserActions
      onEdit={() => editUser(user.id)}
      onDelete={() => deleteUser(user.id)}
      onFollow={() => followUser(user.id)}
    />
  </div>
)

// 接口设计
//
