const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    err: "",
  } as Env,
};

export default store;
