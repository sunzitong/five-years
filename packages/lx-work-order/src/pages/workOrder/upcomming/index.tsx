import React from 'react';
import {
  List,
  Button,
  WhiteSpace,
  TextareaItem,
  Modal,
  Toast,
} from 'antd-mobile';
import { useRequest, useLocation } from 'umi';
import { BaseCard, BaseImages, BaseSteps } from '@/components/base';
import { reportOrderDetail, reportOrderIdeaBack } from '@/services/workOrder';
import { iwant } from '@guanyu/shared';
import { getQueryString } from '@/utils/utils';
import cls from './index.less';
import { baseStepsDataItemProps } from './index.d';

const ListItem = List.Item;

const Upcomming = () => {
  const values: any = useLocation();
  const { hash } = location;
  const {
    query: { id, oa },
  } = values;
  const oaAccount = hash ? getQueryString(hash, 'oa') : oa;

  /**
   * 请求详情
   */
  const { data, run: detailReqRun, loading } = useRequest(() => {
    return reportOrderDetail({ todoId: id, oa: oaAccount });
  });

  /**
   * 提交表单
   */
  const submit = useRequest(
    () => {
      return reportOrderIdeaBack({
        dealIdea: suggest.current,
        oa: oaAccount,
        todoId: id,
      });
    },
    {
      manual: true,
    },
  );

  const detail = data?.data ?? {};
  /**
   * 基本信息
   */
  const baseInfo = detail.baseInfo ?? {};
  /**
   *报备详情
   */
  const orderDetail = detail.orderDetail ?? {};
  /**
   * 工单流转
   */
  const handlerRecord = detail.handlerRecord ?? {};
  /**
   * 报备图片列表
   */
  const baseImagesData = iwant.array<string>(orderDetail.imgUrl).map(src => {
    return { src };
  });

  const suggest = React.useRef<string | undefined>();
  const reportTypeStr = `${baseInfo.reportTypeDesc || ''}${
    baseInfo.eventTypeName ? '-' + baseInfo.eventTypeName : ''
  }`;

  if (loading) Toast.loading('加载中……');

  return (
    <div>
      {baseInfo.reportType === 'NUMBER_ALTER' ? (
        <BaseCard
          title="基本信息"
          data={[
            {
              label: '工单单号',
              value: baseInfo.orderNo,
            },
            {
              label: '申请时间',
              value: baseInfo.createTime,
            },
            { label: '门店名称', value: baseInfo.projectName },
            {
              label: '报备类型',
              value: reportTypeStr || '',
            },
            { label: '报备等级', value: baseInfo.reportLevel },
            { label: '故障类型', value: orderDetail.faultTypeName },
            {
              label: '发生次数',
              value: orderDetail.faultOccurCount,
            },
            { label: '处理人', value: orderDetail.handler },
          ]}
        />
      ) : (
        <BaseCard
          title="基本信息"
          data={[
            {
              label: '报备地址',
              value: baseInfo.address,
            },
            {
              label: '报备类型',
              value: reportTypeStr || '',
            },
            { label: '报备等级', value: baseInfo.reportLevel },
            {
              label: '发生时间',
              value: iwant.date(orderDetail.happenTime, 'yyyy-MM-dd hh:mm'),
            },
          ]}
        />
      )}
      {baseInfo.reportType !== 'NUMBER_ALTER' && (
        <BaseCard
          title="报备详情"
          itemType="horizontal"
          data={[
            {
              label: '客户信息及背景',
              value: orderDetail.clientAndBackGround,
            },
            {
              label: '事件情况',
              value: orderDetail.eventSituation,
            },
            {
              label: '涉及伤亡情况',
              value: orderDetail.casualtiesSituation,
            },
            {
              label: '外部舆情情况及观点',
              value: orderDetail.publicOpinion,
            },
            {
              label: '已采取措施',
              value: orderDetail.measures,
            },
            {
              label: '下一步处理方案',
              value: orderDetail.nextProcessingPlan,
            },
            {
              label: '上传图片',
              value: <BaseImages data={baseImagesData} />,
            },
          ]}
        />
      )}

      <BaseCard
        title="工单流转"
        data={[
          {
            label: '处理人',
            value: (
              <a
                className={cls.tel}
                href={`tel:${orderDetail.handlerPhoneNum}`}
              >
                {orderDetail.handler}
              </a>
            ),
          },
          {
            label: '处理记录',
            type: 'horizontal',
            value: (
              <BaseSteps
                data={iwant
                  .array<baseStepsDataItemProps>(handlerRecord)
                  .map((item: any) => {
                    const descList: Array<any> = [
                      { name: '操作人', value: item.handlerName },
                    ];
                    const keyArr = [
                      { key: 'tenantsAndFamily', name: '租户或相关家属情况' },
                      { key: 'otherTenants', name: '其他租户' },
                      { key: 'media', name: '舆情及其他相关情况' },
                      { key: 'followUpAction', name: '后续动作' },
                      { key: 'otherInformation', name: '其他情况说明' },
                      { key: 'dealIdea', name: '处理意见' },
                      { key: 'causes', name: '产生原因' },
                      { key: 'handlRemark', name: '处理备注' },
                      { key: 'withdrawReason', name: '撤回理由' },
                    ];
                    keyArr.map((key: any) => {
                      if (item[key.key])
                        descList.push({ name: key.name, value: item[key.key] });
                    });
                    return {
                      title: item.title,
                      imgs: item.imgs,
                      descList,
                      time: iwant.date(item.time, 'yyyy-MM-dd hh:mm:ss') || '',
                    };
                  })}
              />
            ),
          },
        ]}
      />
      {baseInfo.reportOrderStatus === 'PENDING' && !detail.todoStatus && (
        <>
          <BaseCard title="处理意见（选填）" data={[]}>
            <div className={cls.upcommingTextArea}>
              <List>
                <TextareaItem
                  name="aaa"
                  placeholder="请填写处理意见"
                  max={500}
                  count={500}
                  rows={5}
                  style={{
                    marginBottom: 15,
                    lineHeight: 1.5,
                    borderTop: 'null',
                  }}
                  onChange={v => {
                    suggest.current = v;
                  }}
                />
              </List>
            </div>
            <WhiteSpace />
          </BaseCard>
          <div className={cls.submitButton}>
            <Button
              loading={submit.loading}
              onClick={() => {
                if (suggest.current) {
                  Modal.alert('确认提交', '确定提交该意见?', [
                    {
                      text: '取消',
                      onPress: () => console.log('cancel'),
                      style: 'default',
                    },
                    {
                      text: '确定',
                      onPress: () => {
                        submit.run().then(res => {
                          detailReqRun();
                          Toast.success('提交成功');
                        });
                      },
                    },
                  ]);
                } else {
                  submit.run().then(res => {
                    detailReqRun();
                    Toast.success('提交成功');
                  });
                }
              }}
              type="primary"
            >
              提交
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Upcomming;
