import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import router from '@/router'
describe('test router', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)

  it('renders the correct markup', () => {
    expect(router.options.routes[0].name).toBe('home')
  })
})

