import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/shipping_company_vehicle',
    method: 'get',
    params
  })
}

export function getAllShippingCompanyVehicle(params) {
  return request({
    url: '/shipping_company_vehicle/all',
    method: 'get',
    params
  })
}

export function show(id) {
  return request({
    url: '/shipping_company_vehicle/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/shipping_company_vehicle',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: '/shipping_company_vehicle/' + id,
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
    url: '/shipping_company_vehicle/' + id,
    method: 'delete'
  })
}
