// import {request} from '@umijs/max'
import Https from '@/utils/Https'

export const queryTableDataReq = params => Https.get('/house/query', params)

// export const uploadImgReq = data => request('/api/v1/uploads', {
//   method: 'post',
//   data
// })
//
// export const queryHouseListReq = data => request('/api/v1/house/list', {
//   method: 'post',
//   data
// })

export const submitHouseFormReq = data => Https.post('/api/v1/house/add', data)
