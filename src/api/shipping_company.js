import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/shipping_company',
    method: 'get',
    params
  })
}

export function getAllShippingCompany(params) {
  return request({
    url: '/shipping_company/all',
    method: 'get',
    params
  })
}

export function show(id) {
  return request({
    url: '/shipping_company/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/shipping_company',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/shipping_company/' + id,
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
    url: '/shipping_company/' + id,
    method: 'delete'
  })
}
