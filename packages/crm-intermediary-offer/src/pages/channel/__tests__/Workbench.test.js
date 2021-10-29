import React from 'react';
import { shallow } from 'enzyme';
import createStore from '@/utils/createStore';
import Workbench from '../Workbench';


describe('Workbench主要ui 正确渲染', () => {
  const store = createStore(() => ({ common: {} }));
  // 通用组件wrapper及实例
  const wrapper = shallow(<Workbench store={store} />);
  test('主要ui渲染出来', () => {
    expect(wrapper.dive().dive().dive().find('List').length).toBe(2);
  });
});
