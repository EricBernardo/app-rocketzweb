import request from '@/utils/request';

export function getCities(state_id) {
  return request({
    url: '/city/' + state_id,
    method: 'get'
  })
}
