import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}

export function getProfile() {
  return request({
    url: '/profile',
    method: 'get'
  })
}

export function saveProfile(data) {
  return request({
    url: '/profile',
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/user',
    method: 'get',
    params
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
