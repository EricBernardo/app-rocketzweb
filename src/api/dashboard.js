import request from '@/utils/request';

export function get(params) {
  return request({
    url: '/dashboard',
    method: 'get',
    params
  })
}
