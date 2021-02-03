import Observer from './Observer.js'

// observe 作用是让对象绑定 __ob__ 属性
export default function observe(value) {
  // 如果参数不是对象则不做操作
  if (typeof value != 'object') return;
  // 定义 ob 
  var ob;
  // 如果参数中有 __ob__ 属性 就赋值给到 ob 
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    // 如果参数中没有 __ob__ 属性创建Observer的实例赋值给到ob 
    ob = new Observer(value)
  }
  return ob
}