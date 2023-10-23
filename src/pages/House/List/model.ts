import {queryTableDataReq} from './service'
export default {
  namespace: 'HouseList',
  state: {

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
