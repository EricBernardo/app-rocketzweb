import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/product',
    method: 'get',
    params
  })
}

export function getAllProducts(params) {
  return request({
    url: '/product/all',
    method: 'get',
    params
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

export function save(data, id) {
  if (id) {
    return update(data, id)
  } else {
    return create(data)
  }
}

export function destroy(id) {
  return request({
    url: '/product/' + id,
    method: 'delete'
  })
}
