import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/me',
    method: 'get'
  })
}

export function get(data) {
  return request({
    url: '/user',
    method: 'get',
    data
  })
}

export function show(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/user/' + id,
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
    url: '/user/' + id,
    method: 'delete'
  })
}
