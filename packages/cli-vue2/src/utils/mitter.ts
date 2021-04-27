import mitt from "mitt";

/**
 * 事件 event emitter / pubsub.
 */
export default mitt();

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
