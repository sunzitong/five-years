const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    err: "",
  } as Env,

  /* TODO: 其他数据 */
};

export default store;
