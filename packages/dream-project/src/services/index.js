import CreateApi from 'utils/createAPI';

// 查询学校
export const searchSchool = CreateApi('/app-server/api/v1/studentAuth/searchSchool', 'GET');

// 获取公共配置
export const commonConfig = CreateApi('/app-server/api/v1/studentAuth/commonConfig', 'GET');

// 上传图片
export const uploadPic = CreateApi('/app-server/api/common/uploadPic', 'POST');
