// LSP
// 子类能够覆盖父类 父类能够出现的地方子类都能够出现

class Game {
  start() {}
  shutdown() {}
}
const game = new Game()
game.play()

// sprint2
class MobileGame extends Game {
  play() {
    // 开始移动端游戏
  }
}
const mobileGame = new MobileGame()
mobileGame.play()

class PCGame extends Game {
  play() {
    // 开始PC游戏
  }
}

// 鸟- 企业问题
class Bird {
  fly(): void {
    console.log('飞行中...')
  }
}

class Penguin extends Bird {
  // 违反LSP：企鹅不会飞
  fly(): void {
    throw new Error('企鹅不能飞！')
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly() // 对企鹅会抛出异常
}

// 表面多态，实际行为不一致
const birds: Bird[] = [new Bird(), new Penguin()]
birds.forEach(makeBirdFly) // 第二个元素会崩溃

// React组件设计

// 父组件定义契约
class DataFetcher extends React.Component {
    // 契约：子类必须实现fetchData
    fetchData() {
      throw new Error("必须实现fetchData方法");
    }
    
    componentDidMount() {
      this.fetchData();
    }
    
    render() {
      // 基础渲染逻辑
      return this.props.children;
    }
  }
  
  // 正确子类实现
  class UserFetcher extends DataFetcher {
    fetchData() {
      // 实际获取用户数据
      fetch('/api/users').then(/* ... */);
    }
    
    render() {
      return (
        <div>
          {super.render()}
          {/* 用户特定渲染 */}
        </div>
      );
    }
  }
  
  // 错误子类（违反LSP）
  class ProductFetcher extends DataFetcher {
    // 忘记实现fetchData - 运行时错误
  }

//   vue中 

// Vue.js中的可替换组件
// 父组件定义插槽契约
<template>
  <div class="card">
    <slot name="header" :title="title"></slot>
    <slot :content="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

// 正确子组件 - 遵循插槽契约
<Card>
  <template #header="{ title }">
    <h2>{{ title }}</h2>
  </template>
  
  <template #default="{ content }">
    <p>{{ content }}</p>
  </template>
  
  <template #footer>
    <button>操作</button>
  </template>
</Card>

// 错误子组件（违反LSP）- 缺少必需插槽
<Card>
  <template #header>
    <h2>标题</h2>
  </template>
  <!-- 缺少内容插槽 -->
</Card>