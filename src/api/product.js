import request from '@/utils/request';

export function get(data) {
  return request({
    url: '/product',
    method: 'get',
    data
  })
}

export function show(id) {
  return request({
    url: '/product/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/product/' + id,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: '/product/' + id,
    method: 'delete'
  })
}
