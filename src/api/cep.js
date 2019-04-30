import request from '@/utils/request';

export function getCEP(cep) {
  return request({
    url: '/cep/' + cep,
    method: 'get'
  })
}
