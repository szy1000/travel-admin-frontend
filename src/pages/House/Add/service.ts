import {request} from '@umijs/max'

export const queryTableDataReq = params => request('/', {
  params
})
