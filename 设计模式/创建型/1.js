// 元素创建型
// 功能：创建元素
// 目的：规范创建步骤

// 工厂模式
// 游戏商店里面下载初始化游戏
class Shop {
  create(name) {
    return new GameFactory(name)
  }
}

class GameFactory {
  constructor(name) {
    this.name = name
  }
  init() {
    // 下载
  }
  run() {
    // 运行游戏
  }
}
const shop = new Shop()
const lol = new GameFactory('lol')
//
const wukong = shop.create('wukong')
wukong.init()
wukong.run()

// 支付
class Payment {
  pay(amount) {
    throw new Error('必须实现Pay方法')
  }
}

// 2. 实现具体的支付类
class Alipay extends Payment {
  pay(amount) {
    console.log(`alipay 支付${amount}`)
  }
}

class WechatPay extends Payment {
  pay(amount) {
    console.log(`WechatPay 支付${amount}`)
  }
}

class UnionPay extends Payment {
  pay(amount) {
    console.log(`UnionPay 支付${amount}`)
  }
}

class PaymentFactory {
  createPayment(type) {
    switch (type.toLowerCase()) {
      case 'alipay':
        return new Alipay()
      case 'wechat':
        return new WechatPay()
      case 'union':
        return new UnionPay()
      default:
        throw new Error('not suppout')
    }
  }
}

const factory = new PaymentFactory()

const payment1 = factory.createPayment('alipay')
payment1.pay(11)

// 解耦创建逻辑
// 扩展性强
// 统一入口
// 问题：没新增一个支付方式 工厂需要改在
// 工厂模式升级
class AdvancedPaymentFactory {
  constructor() {
    this.paymentTypes = {}
  }

  registerPayment(type, PaymentClass) {
    this.paymentTypes[type] = PaymentClass
  }

  createPayment(type) {
    const PaymentClass = this.paymentTypes[type]
    if (!PaymentClass) {
      throw new Error('not register')
    }

    return new PaymentClass()
  }
}

const dynamicFactory = new AdvancedPaymentFactory()

dynamicFactory.registerPayment('alipay', Alipay)
dynamicFactory.registerPayment('wechatpay', WechatPay)

class PayPal extends Payment {
  pay(amount) {
    console.log('paypal')
  }
}

dynamicFactory.registerPayment('paypal', PayPal)

const paypal = dynamicFactory.createPayment('paypal')
paypal.pay(100)

// 简单对象 new
// 工厂模式 创建逻辑复杂 或者灵活扩展的场景
