import React from 'react';
import { shallow } from 'enzyme';
import Index from '../index';

describe('主要ui 正确渲染', () => {
  // 通用组件wrapper及实例
  const wrapper = shallow(<Index />);
  test('主要ui渲染出来', () => {
    expect(wrapper.find('ul').length).toBe(1);
  });
});
