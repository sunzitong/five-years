import CreateApi from 'utils/createApi';

// 上线公告详情
export const noticeDetail = CreateApi('/notification/notice/noticeUserRelationByNoticeId');

// 分享到微信的公告详情
export const shareDetail = CreateApi('/notification/notice/shareNoticeById');
