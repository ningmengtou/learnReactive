var uid = 0
// Dep 的实例对象会出现在对象的每一层中
export default class Dep {
  constructor() {
    // 给订阅者设定 uid
    this.id = uid++
    // subs中存放着订阅者 每一个元素都是 watcher 实例对象
    this.subs = []

  }

  // 添加订阅
  addSub(sub) {
    // 把最新的订阅者添加到 this.subs 中
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    // Dep.target 只是指定的全局位置 只要是全局唯一 没有歧义就好
    if (Dep.target) {
      // 如果 Dep.target 存在就把 Dep.target 添加到 subs 中
      this.addSub(Dep.target)
    }
  }

  // 通知更新
  notify() {
    // 克隆一份 subs 
    const subs = this.subs.slice()
    // 遍历 this.subs 数组让其中的每一个元素都调用 updata
    for (let i = 0; i < subs.length; i++) {
      subs[i].updata()
    }
  }
}