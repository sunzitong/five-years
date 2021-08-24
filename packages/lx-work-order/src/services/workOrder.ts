import { request } from 'umi';
import { ResponseData } from '@guanyu/shared';

/**
 * 工单详情
 * @param params {reportOrderId}
 */
interface reportOrderDetailProps {
  todoId?: string;
  oa?: string;
}

interface reportOrderIdeaBackProps {
  dealIdea?: string;
  todoId?: string;
  oa?: string;
}

export async function reportOrderDetail(params: reportOrderDetailProps) {
  localStorage.setItem('token', '123');
  return request<ResponseData<any>>(
    `/workOrder/reportOrder/notification-detail`,
    {
      params,
    },
  );
}

/**
 * 龙信代办
 * @param params
 */
interface reportOrderLxTodoProps {
  suggest: string | undefined;
  useid: string | number;
}

export async function reportOrderLxTodo(params: reportOrderLxTodoProps) {
  return request<ResponseData<{}>>(`/workOrder/reportOrder/longxin/todo`, {
    params,
  });
}

export async function reportOrderIdeaBack(params: reportOrderIdeaBackProps) {
  return request<ResponseData<{}>>(`/workOrder/reportOrder/ideaBack`, {
    params,
    method: 'post',
  });
}
