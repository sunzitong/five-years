import { get } from './http';

export function getFormList(id) {
  return get(`/cms-server/api/projectQuote/previewQuote?projectId=${id}`);
}
