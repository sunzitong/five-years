import mitt from "mitt";

/**
 * 事件 event emitter / pubsub.
 */
export default mitt();
/**
 * 事件管理
 */
export enum EventName {
  /**
   * resize时重绘echarts
   */
  ResizeEcharts = "re",
  /**
   * 点击网页时触发
   */
  DocumentClick = "dc",
  /**
   * 请求出错
   */
  ServiceError = "se",
}

/*
// 示例
import mitter from "@/utils/mitter";
// 监听事件
mitter.on(name, () => {});
// 触发
mitter.emit(name, payload);
// 删除监听
mitter.off(name, fn);
// 删除监听
mitter.all.delete(name);
// 删除所有
mitter.all.clear();
*/
