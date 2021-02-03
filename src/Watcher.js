import Dep from "./Dep"

var uid = 0
// 依赖就是 watcher 的实例
// 只有 watcher 触发的 getter 才会收集依赖 那个 watcher 触发了 getter 就把那个 watcher 收集到 dep 中
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  // 更新数据
  updata() {
    this.run()
  }

  // 依赖收集阶段
  get() {
    // 进入依赖让 Dep.target 为 watcher 实例本身
    Dep.target = this

    // 获取到对象
    const obj = this.target

    var value;

    // 只要能找就一直往下找
    try {
      value = this.getter(obj)
    } finally {
      // 最后让 Dep.target 为 null
      Dep.target = null
    }

    return value
  }

  run() {
    this.getAndInvoke(this.callback)
  }

  getAndInvoke(cb) {
    // 获取最新值
    const value = this.get()

    // 如果更新的新值和旧值不等
    if (value !== this.value || typeof value == 'object') {
      // this.value 为旧值 value 为新值
      const oldValue = this.value;
      this.value = value
      // 调用回调函数 把最新值传递出去
      cb.call(this.target, value, oldValue)
    }

  }


}

// 处理 . 来访问对象中的值
function parsePath(expression) {
  let segments = expression.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}