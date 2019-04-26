import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/company',
    method: 'get',
    params: params,
  })
}
