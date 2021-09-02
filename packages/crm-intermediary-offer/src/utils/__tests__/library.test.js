import {
  isArray,
  wantArray,
  timeout,
  checkeds,
  formatPicker,
  formatFields,
} from '../library';

jest.mock('../request');


describe('isArray', () => {
  it('个位数应返回：0+数字', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray('j')).toBeFalsy();
  });
});

describe('wantArray', () => {
  it('个位数应返回：0+数字', () => {
    expect(wantArray(['1'])).toEqual(['1']);
    expect(wantArray('j')).toEqual([]);
  });
});

describe('timeout', () => {
  it('个位数应返回：0+数字', () => {
    expect(typeof timeout(1)).toBe('object');
  });
});


describe('checkeds', () => {
  const curr1 = {
    checked: true,
    label: 'test1',
  };
  const curr2 = {
    checked: false,
    label: 'test1',
  };
  it('checkeds', () => {
    expect(checkeds([], curr1)).toEqual(['test1']);
    expect(checkeds([], curr2)).toEqual([]);
  });
});

describe('formatPicker', () => {
  const obj = [
    {
      name: 'Tom',
      id: '1',
    },
    {
      name: 'Ali',
      id: '2',
    },
  ];

  const obj1 = [
    {
      la: 'Tom',
      val: '1',
    },
    {
      la: 'Ali',
      val: '2',
    },
  ];

  const res = {
    items: [
      {
        label: 'Tom',
        value: '1',
      },
      {
        label: 'Ali',
        value: '2',
      },
    ],
    itemsMap: {
      1: {
        name: 'Tom',
        id: '1',
      },
      2: {
        name: 'Ali',
        id: '2',
      },
    },
  };
  const res1 = {
    items: [
      {
        label: 'Tom',
        value: '1',
      },
      {
        label: 'Ali',
        value: '2',
      },
    ],
    itemsMap: {
      1: {
        la: 'Tom',
        val: '1',
      },
      2: {
        la: 'Ali',
        val: '2',
      },
    },
  };

  it('formatPicker', () => {
    expect(formatPicker(obj)).toEqual(res);
    expect(formatPicker(obj1, 'la', 'val')).toEqual(res1);
  });
});


describe('formatFields', () => {
  const data = [
    {
      id: 0,
      name: '北京',
      next: [
        {
          id: 10,
          name: '链家',
        },
        {
          id: 20,
          name: '贝壳',
        },
      ],
    },
    {
      id: 1,
      name: '上海',
      next: [
        {
          id: 2,
          name: '我爱我家',
        },
        {
          id: 3,
          name: '麦田',
        },
      ],
    },
  ];

  const res = [
    {
      value: 0,
      label: '北京',
      children: [
        {
          value: 10,
          label: '链家',
        },
        {
          value: 20,
          label: '贝壳',
        },
      ],
    },
    {
      value: 1,
      label: '上海',
      children: [
        {
          value: 2,
          label: '我爱我家',
        },
        {
          value: 3,
          label: '麦田',
        },
      ],
    },
  ];

  it('formatFields', () => {
    expect(formatFields(data)).toEqual(res);
  });
});
