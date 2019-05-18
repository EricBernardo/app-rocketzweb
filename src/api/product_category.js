import request from '@/utils/request';

export function get(params) {
  return request({
    url: '/product_category',
    method: 'get',
    params
  })
}

export function getAllProductCategories() {
  return request({
    url: '/product_category/all',
    method: 'get'
  })
}

export function show(id) {
  return request({
    url: '/product_category/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/product_category',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/product_category/' + id,
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
    url: '/product_category/' + id,
    method: 'delete'
  })
}
