// 装饰器模式
// 会进行能力上的提升
// 动态的为对象添加新功能 不改变原有结构

class Device {
  create() {
    console.log('ps4')
  }
}

class Phone {
  create() {
    console.log('iphone 16')
  }
}

class Decorator {
  constructor(device) {
    this.device = device
  }
  create() {
    this.device.create()
  }
  update(device) {
    device.create()

    // 能力增强
    return fn(device.create())
  }
}

const device = new Device()
device.create()

const newDevice = new Decorator(device)
newDevice.create()
newDevice.update()

// 使用场景
// 抽象组件
interface UIComponent {
    render(): string;
  }
  
  // 具体组件
  class Button implements UIComponent {
    render() {
      return "<button>提交</button>";
    }
  }
  
  // 抽象装饰器
  abstract class UIDecorator implements UIComponent {
    constructor(protected component: UIComponent) {}
    
    render() {
      return this.component.render();
    }
  }
  
  // 具体装饰器：添加图标
  class IconDecorator extends UIDecorator {
    render() {
      return `<i class="icon"></i>${super.render()}`;
    }
  }
  
  // 具体装饰器：添加悬浮提示
  class TooltipDecorator extends UIDecorator {
    render() {
      return `${super.render()}<div class="tooltip">点击提交</div>`;
    }
  }
  
  // 使用
  const button = new Button();
  const decoratedButton = new TooltipDecorator(new IconDecorator(button));
  console.log(decoratedButton.render());
  // 输出：<i class="icon"></i><button>提交</button><div class="tooltip">点击提交</div>

//   HOC
// 基础组件
const Button = () => <button>原始按钮</button>;

// 装饰器组件（HOC）
const withLoading = (WrappedComponent) => {
  return (props) => (
    props.isLoading 
      ? <div>加载中...</div>
      : <WrappedComponent {...props} />
  );
};

// 增强后的组件
const ButtonWithLoading = withLoading(Button);

// 使用
<ButtonWithLoading isLoading={true} />

// 表单增强
// 基础表单
class FormComponent {
    submit() {
      console.log("提交基础表单");
    }
  }
  
  // 校验装饰器
  class ValidationDecorator {
    constructor(private form: FormComponent) {}
  
    submit() {
      if (this.validate()) {
        this.form.submit();
      }
    }
  
    private validate() {
      console.log("执行校验逻辑");
      return true; // 模拟校验成功
    }
  }
  
  // 使用
  const form = new ValidationDecorator(new FormComponent());
  form.submit(); // 先校验再提交


  // 路由组件装饰器
const withAuth = (WrappedComponent) => {
    return (props) => {
      const [isAuth] = useAuth();
      
      return isAuth 
        ? <WrappedComponent {...props} />
        : <Redirect to="/login" />;
    };
  };
  
  // 使用
  const AdminPage = () => <div>管理员页面</div>;
  const ProtectedAdminPage = withAuth(AdminPage);


  // 埋点装饰器
const withTracking = (eventName: string) => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      
      descriptor.value = function(...args: any[]) {
        trackEvent(eventName); // 埋点逻辑
        return originalMethod.apply(this, args);
      };
      
      return descriptor;
    };
  };
  
  // 使用
class CheckoutService {
@withTracking("checkout_click")
processPayment() {
    // 支付逻辑
}
}

// css in js
// 样式装饰器
const withStyle = (styles) => (Component) => {
    return (props) => (
      <div style={styles}>
        <Component {...props} />
      </div>
    );
  };
  
  // 使用
  const Card = () => <div>内容卡片</div>;
  const StyledCard = withStyle({
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderRadius: "8px"
  })(Card);

//  优势
// 1. 开闭原则：不修改原有代码 即可扩展功能
// 2. 组合优于继承：避免类爆炸问题
// 3. 职责分离 装饰器和被装饰对象独立变化
// 4. 运行时拓展 动态添加和移除
