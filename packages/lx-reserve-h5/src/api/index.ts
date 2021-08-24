import http from "./http";
import {
  PROMOTION,
  PROMOTION_CITY_LIST,
  PROJECT_LIST,
  PROJECT_DETAIL,
  INVOICE_LIST,
  SIGN_NEW,
  ORDER_LIST,
  CHANGE_LIST,
  ORDER_DETAIL,
  ORDER_CANCEL,
  GET_TOKEN,
} from "./urls";
import { env } from "@/store";

// 门店列表请求参数type
interface ProjectListReqType {
  cityId: string | (string | null)[];
  startDate: string | (string | null)[];
  endDate: string | (string | null)[];
}

// 订单列表请求参数type
interface OrderListReqType {
  orderType: string;
  oaAccount: string;
  pageNum: number;
  pageSize: number;
}
interface ChangeListReqType {
  oaAccount: string;
  // pageNum: number;
  // pageSize: number;
}

// 发票列表请求参数type
interface InvoiceListReqType {
  companyName: string,
}

// 门店详情请求参数type
interface ProjectDetailReqType {
  projectId: string | (string | null)[];
}

// 订单详情请求参数type
interface OrderDetailReqType {
  orderId: string | (string | null)[];
  oaAccount: string | (string | null)[];
}

// 取消订单请求参数type
interface cancelOrderReqType {
  orderId: string | (string | null)[];
  oaAccount: string | (string | null)[];
}

// 获取用户信息参数
interface tokenReqType {
  accessToken: string | (string | null)[];
}

// 提交订单请求参数type
interface SignNewReqType {
  projectId: string | (string | null)[];
  projectName: string | (string | null)[];
  startTime: number;
  endTime: number;
  dailyRentAmount: string | (string | null)[];
  userName: string;
  phone: string;
  idType: string;
  idNo: string;
  invoiceTitle: string;
  oaAccount: string;
  daysGap: string | (string | null)[];
  changeNo: string | (string | null)[];
}

/**
 * 查询活动信息
 */
export function getActivityInfo() {
  return http.get<Activity>(PROMOTION + env.sn);
}

/**
 * 获取城市列表
 */
export function getCityList() {
  return http.get<string[]>(PROMOTION_CITY_LIST, {
    activityNumber: env.sn,
  });
}

/**
 * 获取门店列表
 */
export function getProjectList(data: ProjectListReqType) {
  return http.get<string[]>(PROJECT_LIST, data);
}

/**
 * 获取门店详情
 */
export function getProjectDetail(data: ProjectDetailReqType) {
  return http.get<any>(PROJECT_DETAIL, data);
}

/**
 * 获取发票抬头列表
 */
export function getInvoiceList(data: InvoiceListReqType) {
  return http.get<string[]>(INVOICE_LIST, data);
}

/**
 * 提交订单
 */
export function signNew(data: SignNewReqType) {
  return http.post<string[]>(SIGN_NEW, data);
}

/**
 * 获取订单列表
 */
export function getOrderList(data: OrderListReqType) {
  return http.get<any>(ORDER_LIST, data);
}

/**
 * 获取异动单列表
 */
export function getChangeList(data: ChangeListReqType) {
  return http.get<any>(CHANGE_LIST, data);
}

/**
 * 获取订单详情
 */
export function getOrderDetail(data: OrderDetailReqType) {
  return http.get<any>(ORDER_DETAIL, data);
}

/**
 * 取消订单
 */
export function cancelOrder(data: cancelOrderReqType) {
  return http.get<any>(ORDER_CANCEL, data);
}

/**
 * 获取用户信息
 */
export function getUserByToken() {
  return http.get<any>(GET_TOKEN);
}

export default {
  getActivityInfo,
  getCityList,
  getProjectList,
  getProjectDetail,
  signNew,
  getOrderList,
  getOrderDetail,
  cancelOrder,
};
