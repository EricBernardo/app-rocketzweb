import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/client',
    method: 'get',
    params
  })
}

export function getAllClients(params) {
  return request({
    url: '/client/all',
    method: 'get',
    params
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
