export const toFixed = (num, dig = 2) => {
  const val = parseFloat(num);
  if (Number.isNaN(val)) return '';
  return val.toFixed(dig);
};
export const createCode = (active) => {
  const masterUrl = 'oms.gyapt.cn';
  const masterUrl1 = 'm.iguanyu.com';
  const url = location.host;
  const codes = {
    didi: { test: 155345, staging: 126788, master: 217097 },
    tencent: { test: 152895, staging: 126482, master: 148610 },
    wastons: { test: 152896, staging: 126483, master: 148567 },
    cgbBank: { test: 155347, staging: 126799, master: 217334 },
    iqiyi: { test: 155346, staging: 126798, master: 217333 },
  };
  const code = url === masterUrl || url === masterUrl1 ?
    codes[active].master : url.indexOf('.staging.') >= 0 ?
      codes[active].staging : codes[active].test;
  return code;
};
