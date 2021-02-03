import { def } from './utils.js'
// 创建数组的原型
const arrayPrototype = Array.prototype

// 以数组原型创建新的对象
export const arrayMethods = Object.create(arrayPrototype)

// 需要被改写的数组方法
let methodsNeedChange = [
  'push',
  'pop',
  'unshift',
  'shift',
  'sort',
  'splice',
  'reverse'
]

// 遍历数组方法
methodsNeedChange.forEach(item => {
  // 从数组原型中备份数组方法
  const original = arrayPrototype[item]

  // 调用 def 配置新的数组方法
  def(arrayMethods, item, function () {
    // 获取到 ob 
    const ob = this.__ob__;

    // push unshift splice 会添加新项新添加的也需要observe
    // inserted 默认为空数组
    let inserted = []

    // 把 arguments 变成数组
    let args = [...arguments]

    // 查看 item 数组方法是什么
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
    }

    // 如果新插入有项 让数组中的每一项都使用 observeArray
    if (inserted) {
      ob.observeArray(inserted)
    }

    // 调用备份中的数组方法 恢复原本数组的功能 某些方法有返回值 所以需要return
    const result = original.apply(this, arguments)

    console.log('lalal');
    ob.dep.notify()
    return result
  }, false)

})
