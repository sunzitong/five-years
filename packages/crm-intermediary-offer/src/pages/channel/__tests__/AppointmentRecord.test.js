import React from 'react';
import { shallow } from 'enzyme';
import createStore from '@/utils/createStore';
import AppointmentRecord from '../AppointmentRecord';


describe('AppointmentRecord主要ui 正确渲染', () => {
  const store = createStore(() => ({
    appointment: {},
  }));
  // 通用组件wrapper及实例
  const wrapper = shallow(<AppointmentRecord store={store} />);
  test('主要ui渲染出来', () => {
    expect(wrapper.dive().dive().find('ListView').length).toBe(1);
  });
});
