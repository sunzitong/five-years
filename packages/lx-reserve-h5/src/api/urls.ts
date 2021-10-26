/*
 * @Author: your name
 * @Date: 2020-10-12 11:13:06
 * @LastEditTime: 2020-10-12 11:21:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /lx-reserve-h5/src/api/urls.ts
 */
export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 活动信息接口 url接活动编号查询
 */
export const PROMOTION = `${BASE_URL}/marketing/api/promotion/`;

/**
 * 城市列表
 */
export const PROMOTION_CITY_LIST = `${BASE_URL}/marketing/api/promotion/city/list`;

/**
 * 门店列表
 */
export const PROJECT_LIST = `${BASE_URL}/businessTrip/open/api/project/list`;

/**
 * 门店详情
 */
export const PROJECT_DETAIL = `${BASE_URL}/businessTrip/open/api/project/detail`;

/**
 * 发票列表
 */
export const INVOICE_LIST = `${BASE_URL}/invoiceApi/invoice/bw/title/query`;

/**
 * 新签订单
 */
export const SIGN_NEW = `${BASE_URL}/businessTrip/open/api/order/signNew`;

/**
 * 订单列表
 */
export const ORDER_LIST = `${BASE_URL}/businessTrip/open/api/order/list`;

/**
 * 异动列表
 */
export const CHANGE_LIST = `${BASE_URL}/businessTrip/open/api/changeOrder/list`;

/**
 * 订单详情
 */
export const ORDER_DETAIL = `${BASE_URL}/businessTrip/open/api/order/detail`;

/**
 * 取消订单
 */
export const ORDER_CANCEL = `${BASE_URL}/businessTrip/open/api/order/cancel`;
/**
 * 获取用户信息
 */
export const GET_TOKEN = `${BASE_URL}/businessTrip/open/api/getUserByToken`;
