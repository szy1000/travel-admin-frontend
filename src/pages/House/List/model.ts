import {queryTableDataReq, submitHouseFormReq} from './service'
export default {
  namespace: 'HouseList',
  state: {
    init: false
  },
  effects: {
    *pageInit({params}, {call, put}) {
      const res = yield call(queryTableDataReq, params)
      yield put({
        type: 'save',
        payload: {
          ...res
        }
      })
      return {
        ...res
      }
    },
    *submitForm({params}, {call,put}) {
      const res = yield call(submitHouseFormReq, params)
      console.log(res)


    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}
