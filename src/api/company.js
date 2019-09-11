import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/company',
    method: 'get',
    params
  })
}

export function getAllCompany() {
  return request({
    url: '/company/all',
    method: 'get'
  })
}

export function show(id) {
  return request({
    url: '/company/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/company/' + id,
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
    url: '/company/' + id,
    method: 'delete'
  })
}

export function destroyFile(id) {
  return request({
    url: '/company/file',
    method: 'delete',
    data: { id: id }
  })
}
