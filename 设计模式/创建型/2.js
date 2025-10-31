// 建造者模式
// 拆分出不同的模块 独立执行  =》 搭配 串联模块

// 需求 优惠套餐  商品 皮肤  需要进行组合打包售卖
class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    // 商品逻辑
  }
}

class Skin {
  constructor(name) {
    this.name = name
  }
  init() {
    // 皮肤逻辑
  }
}

class PackageBuilder {
  constructor(name) {
    this.game = new Product(name)
    this.skin = new Skin(name)
  }

  getPackage() {
    // 组合方案 构建方案
    return this.game.init() + this.skin.init()
  }
}

class Shop {
  constructor() {
    this.package = ''
  }
  create(name) {
    this.package = new PackageBuilder(name)
  }
  getGamePackage() {
    return this.package.getPackage()
  }
}
