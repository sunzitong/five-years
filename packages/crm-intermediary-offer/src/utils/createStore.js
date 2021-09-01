import { createStore } from 'redux';

// 测试需要用的 创建store的工具函数
// 使用的时候传入初始状态存入状态集 传入初始状态 生成store
export default function testStore(initialState) {
  const reducer = (state = {
    loading: {
      effects: {},
      models: {},
    },
    ...initialState,
  }, action = {}) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      default:
        return state;
    }
  };
  const store = createStore(reducer); // 这个store是一个完整的原生redux store
  return store;
}
