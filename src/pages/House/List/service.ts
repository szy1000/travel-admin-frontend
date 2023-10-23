import {request} from '@umijs'
console.log(request)

export const queryTableDataReq = params => request('/', {
  params
})
