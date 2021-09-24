import { toFixed } from '@/utils/tool';

describe('tool.js', () => {
  it('应该保留两位小数', () => {
    expect(toFixed(1)).toEqual('1.00');
  });
});
