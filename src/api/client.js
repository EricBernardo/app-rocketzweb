import request from '@/utils/request';

export function get() {
  return request({
    url: '/client',
    method: 'get'
  })
}

export function getAllClient() {
  return request({
    url: '/client/all',
    method: 'get'
  })
}

export function show(id) {
  return request({
    url: '/client/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/client',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/client/' + id,
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
    url: '/client/' + id,
    method: 'delete'
  })
}
