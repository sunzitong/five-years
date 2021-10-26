export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 综合经营指数
 */
export const monthlyIndexNumSort = `${BASE_URL}/report/cockpit/appB/monthlyIndexNumSort`;

/**
 * 月度指数排名
 */
export const optAndSaleIndexNum = `${BASE_URL}/report/cockpit/appB/optAndSaleIndexNum`;

/**
 * 年度KP达成排名
 */
export const yearlyKpSort = `${BASE_URL}/report/cockpit/appB/yearlyKpSort`;

/**
 * 小冠-公用枚举
 */
export const publicEnum = `${BASE_URL}/report/cockpit/appB/publicEnum`;

/***************************** v2 *****************************/

/**
 * 出租率分析
 */
export const rentRatio = `${BASE_URL}/report/cockpit/appB/rentRatio`;

/**
 * 续租率分析
 */
export const renewRatio = `${BASE_URL}/report/cockpit/appB/renewRatio`;

/**
 * 续租率分析-不续租原因分析
 */
export const renewRatioReason = `${BASE_URL}/report/cockpit/appB/renewRatioReason`;

/**
 * 违退率分析
 */
export const defCheckoutRatio = `${BASE_URL}/report/cockpit/appB/defCheckoutRatio`;

/**
 * 违退率分析-原因分析
 */
export const defCheckoutRatioReason = `${BASE_URL}/report/cockpit/appB/defCheckoutRatioReason`;

/**
 * 租期分布分析
 */
export const rentTerm = `${BASE_URL}/report/cockpit/appB/rentTerm`;

/**
 * 收入达成分析
 */
export const incomeReach = `${BASE_URL}/report/cockpit/appB/incomeReach`;

/**
 * 收入达成分析-原因分析
 */
export const incomeReachReason = `${BASE_URL}/report/cockpit/appB/incomeReachReason`;

/**
 * 收入达成分析-收入/预算日趋势
 */
export const incomeReachDaily = `${BASE_URL}/report/cockpit/appB/incomeReachDaily`;

/**
 * 收入达成分析-收入达成详情
 */
export const incomeReachDetails = `${BASE_URL}/report/cockpit/appB/incomeReachDetails`;

/**
 * 行驶系统-动态调价
 */
export const modifyPrice = `${BASE_URL}/report/cockpit/appB/driver/modifyPrice`;

/**
 * 行驶系统-动态调价-户型列表
 */
export const modifyPriceLayouts = `${BASE_URL}/report/cockpit/appB/driver/modifyPriceLayouts`;

/**
 * 行驶系统-客储与转化率
 */
export const cusStore = `${BASE_URL}/report/cockpit/appB/driver/cusStore`;

// ******************************************v4*****************************************************
/**
 * 收入预测计算器 - 计算器
 */
export const calcSolution = `${BASE_URL}/report/cockpit/appB/incomeForecast`;

/**
 * 小冠-运营成本分析页
 */
export const optCost = `${BASE_URL}/report/cockpit/appB/optCost`;

/**
 * 小冠-营销费用分析页
 */
export const marketingCost = `${BASE_URL}/report/cockpit/appB/marketingCost`;

/**
 * 小冠-行驶系统-未同步设备详情
 */
export const equipmentOffline = `${BASE_URL}/report/cockpit/appB/driver/equipmentOffline`;

/**
 * 小冠-行驶系统-能耗异常详情
 */
export const equipmentEnergy = `${BASE_URL}/report/cockpit/appB/driver/equipmentEnergy`;
