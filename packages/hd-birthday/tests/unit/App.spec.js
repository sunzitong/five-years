import {shallowMount} from '@vue/test-utils'
import App from '@/App'
import Router from 'vue-router'
describe('App.vue', () => {
  const wrapper = shallowMount(App,{
    stubs: ['router-view']
  })

  it('是否存在app元素', () => {
    expect(wrapper.find('#app').exists()).toBeTruthy()
  })
})

