import { def } from './utils.js'
import defineReactive from './defineReactive.js'
import { arrayMethods } from './array.js'
import observe from './observe.js'
import Dep from './Dep.js'
// 定义 Observer 类
// 作用是：把一个正常的对象转换为每个层级的属性都是响应式的对象
export default class Observer {
  constructor(value) {
    // 每一个 Observer 实例上都有一个 Dep 实例
    this.dep = new Dep()
    console.log('创建了dep');
    // 给 value 对象中定义 __ob__ 属性定义值为 this(实例对象) 该属性不能被枚举
    def(value, '__ob__', this, false)
    // 判断参数是数组还是对象
    if (Array.isArray(value)) {
      // 是数组就使用 Object.setPrototypeOf 强行让 value 原型指向 arrayMethods 
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
      console.log(value)
    } else {
      // 是对象就遍历对象
      this.walk(value)
    }
  }

  // 遍历对象
  walk(value) {
    for (let k in value) {
      // 调用 defineReactive 让对象中的每一个属性变成响应式的
      defineReactive(value, k)
    }
  }

  // 遍历数组
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      // 数组中的每一项都 observe
      observe(arr[i])
    }

  }
}