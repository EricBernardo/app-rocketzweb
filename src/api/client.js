import request from '@/utils/request';

export function get(params) {
  return request({
    url: '/client',
    method: 'get',
    params: params
  })
}

export function show(id) {
  return request({
    url: '/client/' + id,
    method: 'get'
  })
}

export function create(params) {
  return request({
    url: '/client',
    method: 'post',
    data: params
  })
}

export function update(params, id) {
  return request({
    url: '/client/' + id,
    method: 'put',
    params: params
  })
}

export function destroy(id) {
  return request({
    url: '/client/' + id,
    method: 'delete'
  })
}
