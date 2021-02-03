import Dep from './Dep.js'
import observe from './observe.js'
// defineReactive 是创建闭包环境来让 Object.defineProperty() 更好的的改变对象的值
// 这里的 val 就是临时变量
export default function defineReactive(data, key, val) {
  // 创建 Dep 实例对象
  let dep = new Dep()
  // arguments 参数只有两个说明 属性是嵌套的对象
  if (arguments.length == 2) {
    val = data[key]
  }
  // 如果 val 不是对象则返回 undefined
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可被配置
    configurable: true,
    // 访问 key 属性时触发 get 函数
    get() {
      console.log('访问了' + key + '属性');
      // 如果现在是出于依赖的收集阶段
      if (Dep.target) {
        // 添加依赖
        dep.depend()
        // 再判断子元素是否存在收集阶段
        if (childOb) {
          childOb.dep.depend()
        }
      }
      console.log(Dep.target);
      return val
    },
    // 修改 key 属性时触发 set 函数 参数是修改的值
    set(newValue) {
      console.log('修改了' + key + '属性');
      // 查看修改后的属性值和原本属性值是否一致
      if (val === newValue) {
        return
      }
      // 不一致就让修改后的属性值赋值给val
      val = newValue
      // 新值也需要 observe 
      childOb = observe(newValue)

      dep.notify()
    }
  })
}
