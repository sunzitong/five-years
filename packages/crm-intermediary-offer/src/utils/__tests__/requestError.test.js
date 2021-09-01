import requestError from '../requestError';

describe('isArray', () => {
  const res1 = {
    status: 'ok',
  };
  const res2 = {
    status: 'fail',
  };
  it('个位数应返回：0+数字', () => {
    expect(requestError()).toBeUndefined();
    expect(requestError(res1)).toBeTruthy();
    expect(requestError(res2)).toBeFalsy();
  });
});
