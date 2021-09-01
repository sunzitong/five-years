import React from 'react';
import { shallow } from 'enzyme';
import createStore from '@/utils/createStore';
import WorkBenches from '../WorkBenches';


describe('WorkBenches主要ui 正确渲染', () => {
  const store = createStore(() => ({ common: {} }));
  // 通用组件wrapper及实例
  const wrapper = shallow(<WorkBenches store={store} />);
  test('主要ui渲染出来', () => {
    expect(wrapper.dive().dive().find('List').length).toBe(2);
  });
});
