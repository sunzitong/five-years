/**
 * 检测是否为数组
 */
export const isArray = array => Array.isArray(array);

/**
 * 返回数组
 */
export const wantArray = array => (isArray(array) ? array : []);

/**
 * 封装timeout函数
 */
export const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * reduce
 * @param {Array} array
 * @param {Function} callcack
 * @param {Any} 初始值
 */
export const reduce = (array, fn, init) => {
  return wantArray(array).reduce(fn, init);
};

/**
 * map
 * @param {*} array
 * @param {*} fn
 */
export const imap = (array, fn) => {
  return wantArray(array).map(fn);
};

/**
 * 筛选选中状态
 * @param {*} prev
 * @param {*} curr
 */
export const checkeds = (prev, curr) => {
  if (curr.checked) {
    prev.push(curr.label);
  }
  return prev;
};

/**
 * 是iphone x
 */
export const isIphonex = () => {
  const u = navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isIOS) {
    return window.screen.height === 812 && window.screen.width === 375;
  }
};

/**
 * 日期选择
 */
export const CONDTIONS_TIME = [
  { label: '昨日', value: 'yesterday' },
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本年', value: 'year' },
];

/**
 * 格式处理类型
 */
export const formatPicker = (array, label = 'name', value = 'id') => {
  const itemsMap = {};
  const items = imap(array, (item) => {
    const val = item[value];
    const lab = item[label];
    itemsMap[val] = item;
    return { label: lab, value: val };
  });
  return { items, itemsMap };
};

/** 小冠的方法  */
export const xiaoguan = {
  selectProject: () => {
    const res = (window.getCurrentProject && window.getCurrentProject()) || {};
    window.location = `xiaoguan://projects/select?selectedId=${res.projectId}&hasAllCitiesOption=1&globalNotify=0&isRemember=1`;
  },
};

/**
 * [typeOf 数据类型检测]
 * @param  {*} obj
 * @return {[String]}
 */
export function typeOf(obj) {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}


/**
 * 格式化级联所用字段
 * array Array []
 * fields Object { label: 'name', value: 'id', children: 'next' }
 */
export const formatFields = (array, fieldsName = { label: 'name', value: 'id', children: 'next' }) => {
  const { label, value, children } = fieldsName;
  return wantArray(array).map((item) => {
    const newItem = {
      label: item[label],
      value: item[value],
    };
    if (isArray(item[children])) {
      newItem.children = formatFields(item[children]);
    }
    return newItem;
  });
};
