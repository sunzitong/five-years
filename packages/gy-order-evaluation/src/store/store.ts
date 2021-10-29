interface Act {
  status: null | "success" | "fail" | "loading";
  data: null | Activity;
}

const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    sn: "",
    err: "",
  } as Env,

  /**
   * 活动接口数据 ActivityInfo
   */
  act: {
    status: null,
    data: null,
  } as Act,
};

export default store;
