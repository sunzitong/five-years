import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from '../SearchResult';


describe('SearchResult主要ui 正确渲染', () => {
  // 通用组件wrapper及实例
  const wrapper = shallow(<SearchResult location={{ query: {} }} />);
  test('主要ui渲染出来', () => {
    expect(wrapper.dive().find('NavBar').length).toBe(1);
  });
});
