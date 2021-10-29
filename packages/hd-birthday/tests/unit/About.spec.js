// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import maMobile from '@longfor/ma-mobile' // 引入ma-mobile依赖
import About from '@/views/About'
import cubui from 'cube-ui'
Vue.use(maMobile)
Vue.use(cubui)
const localVue = createLocalVue()
// localVue.use(Vuex)
// const store = new Vuex.Store(cloneDeep(store))
describe('About', () => {
// 现在挂载组件，你便得到了这个包裹器
  const wrapper = shallowMount(About, {
    localVue
  })
  wrapper.find('h1').trigger('click')
  expect(wrapper.vm.num).toBe(1)
  console.log(wrapper.find('h1'))
// 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
  const vm = wrapper.vm
  // const Constructor = Vue.extend(About)
  // const vm = new Constructor().$mount()
  const content = vm.$el.querySelectorAll('div')
  it('test className', () => {
    expect(wrapper.classes()).toContain('about')
  })

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<div class="about">')
  })

  it('get name', () => {
    expect(About.name).toBe('About')
  })
})
