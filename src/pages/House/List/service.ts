import {request} from '@umijs/max'
console.log(request)

export const queryTableDataReq = params => request('/', {
  params
})

export const submitHouseFormReq = data => request('/api/v1/house/add', {
  method: 'post',
  data
})
