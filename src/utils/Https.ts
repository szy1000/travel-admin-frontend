/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import { getItem, removeAllItem } from '@/utils/localstorage'
import { history } from 'umi'
import { message } from 'antd'
import { TOKEN } from '@/constants'

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 1000 * 10
})

instance.interceptors.request.use((config) => {
  const { headers, data } = config
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: getItem(TOKEN),
      Token: getItem(TOKEN),
    },
    // params: data
  }
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

const handleResponse = (res) => {
  const { code, msg, data } = res
  switch (code) {
    case 200:
      if (data) {
        return data
      } else {
        delete res.code;
        delete res.msg;
        return res
      }

    case 401:
      message.info(codeMessage[401])
      removeAllItem()
      history.replace('/login')
      return null
    default:
      message.error(msg)
      return null
  }
}

const promiseFun = (method = 'get', url, params, needCode = false, resolve) => {
  instance[method](url, params)
    .then((res) => {
      if (needCode) {
        resolve(res.data)
      } else {
        resolve(handleResponse(res.data))
      }
    })
    .catch(err => {
      message.error(codeMessage[err?.response?.status] || '系统异常')
    })
}

export default class Https {
  static async get(url, params = {}, needCode = false) {
    return await new Promise((resolve) => {
      promiseFun('get', url, { params }, needCode, resolve)
    })
  }

  static async post(url, params = {}, needCode = false) {
    return await new Promise((resolve) => {
      promiseFun('post', url, params, needCode, resolve)
    })
  }

  static async put(url, params = {}, needCode = false) {
    return await new Promise((resolve) => {
      promiseFun('put', url, params, needCode, resolve)
    })
  }

  static async delete(url, params = {}, needCode = false) {
    return await new Promise((resolve) => {
      promiseFun('delete', url, params, needCode, resolve)
    })
  }
}
