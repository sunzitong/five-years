import CreateApi from 'utils/createApi';

// 查询未核销原因、未到账原因保存
export const save = CreateApi('/api/contract/guanyu/big/agentOrderUnPay', 'POST');
export const info = CreateApi('/api/contract/guanyu/big/agentOrderUnPay', 'POST');
