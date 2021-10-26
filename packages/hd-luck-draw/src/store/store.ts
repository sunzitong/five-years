const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    sn: "",
    err: "",
  } as env,

  /**
   * 活动接口数据 ActivityInfo
   */
  act: {
    status: "" as string | number,
    data: {} as Dictionary<any>,
  },
};

export default store;
