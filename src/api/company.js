import request from '@/utils/request';

export function get(params) {
  return request({
    url: '/company',
    method: 'get',
    params: params
  })
}

export function show(id) {
  return request({
    url: '/company/' + id,
    method: 'get'
  })
}

export function create(params) {
  return request({
    url: '/company',
    method: 'post',
    data: params
  })
}

export function update(params, id) {
  return request({
    url: '/company/' + id,
    method: 'put',
    params: params
  })
}

export function destroy(id) {
  return request({
    url: '/company/' + id,
    method: 'delete'
  })
}
