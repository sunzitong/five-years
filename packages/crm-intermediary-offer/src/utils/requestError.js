import { Toast } from 'antd-mobile';

export default function requestError(response) {
  if (!response) return;
  if (response.status && response.status === 'ok') {
    return true;
  } else if (response.status) {
    Toast.info(response.msg, 3);
    return false;
  }
  return false;
}
