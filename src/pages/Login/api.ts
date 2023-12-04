import Https from '@/utils/Https'

export const loginReq = params => Https.post('/user/login', params, true)
export const loginByCodeReq = params => Https.post('/loginByCode', params, true)

export const sendCodeReq = params => Https.get(`/common/sendMsg/${params.phone}`, params, true)
