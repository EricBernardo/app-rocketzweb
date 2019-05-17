import request from '@/utils/request';

export function get(params) {
  return request({
    url: '/order',
    method: 'get',
    params
  })
}

export function show(id) {
  return request({
    url: '/order/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/order',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/order/' + id,
    method: 'put',
    data
  })
}

export function save(data, id) {
  if (id) {
    return update(data, id)
  } else {
    return create(data)
  }
}

export function destroy(id) {
  return request({
    url: '/order/' + id,
    method: 'delete'
  })
}
