import {shallowMount} from '@vue/test-utils'
import Home from '@/views/Home'
import Cube from 'cube-ui'
describe('Home', () => {
  const wrapper = shallowMount(Home,{
    stubs: ['cube-button']
  })

  it('渲染正确的标记', () => {
    expect(wrapper.find('.home').exists()).toBe(true)
  })
  it('has name property', () => {
    expect(Home.name).toBe('home')
  })
})

