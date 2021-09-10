import http from "./http";
import { demoTest } from "./urls";
import { env } from "@/store";
import { IdField } from "@guanyu/shared";

/**
 * 测试数据
 */
export type Demo = {
  name: string;
  id: IdField;
  value: number;
};

/**
 * 测试
 */
export function getDemo() {
  return http.get<Demo[]>(demoTest, {
    activityNumber: env.NODE_ENV,
  });
}

export default {
  getDemo,
};
