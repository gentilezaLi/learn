class EventBus {
  private subscribers: Record<string, Array<(data?: any) => void>> = {};

  // 订阅事件
  subscribe(event: string, callback: (data?: any) => void): () => void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    // 返回取消订阅函数
    return () => {
      this.unsubscribe(event, callback);
    };
  }

  // 发布事件
  publish(event: string, data?: any): void {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`事件处理错误: ${event}`, error);
      }
    });
  }

  // 取消订阅
  unsubscribe(event: string, callback: (data?: any) => void): void {
    if (!this.subscribers[event]) return;
    const index = this.subscribers[event].indexOf(callback);
    if (index !== -1) {
      this.subscribers[event].splice(index, 1);
    }
  }

  // 一次性订阅
  once(event: string, callback: (data?: any) => void): void {
    const onceHandler = (data?: any) => {
      callback(data);
      this.unsubscribe(event, onceHandler);
    };
    this.subscribe(event, onceHandler);
  }
}

// 使用示例
const bus = new EventBus();

// 订阅事件
const unsub = bus.subscribe("user.login", (user) => {
  console.log(`用户登录: ${user.name}`);
});

// 发布事件
bus.publish("user.login", { name: "Alice", id: 123 });

// 取消订阅
unsub();

// 一次性订阅
bus.once("app.initialized", () => {
  console.log("应用已初始化");
});

