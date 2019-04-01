import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

import {
  queryUserListLowdb,
  updateUserLowdb,
  createUserLowdb,
  removeUserLowdb,
  removeUserListLowdb
} from 'api'

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    currentItem: {},
    modalVisible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/user', location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'query',
            payload
          })
        }
      })
    }
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      console.log('Start querying users...')
      const data = call(queryUserListLowdb, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              current: 1,
              pageSize: 10,
              total: data.length
            }
          }
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = call(removeUserLowdb, { id: payload })
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: data
          }
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      // yield deleteUser here
      const data = call(removeUserListLowdb, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: data } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      // yield createUser here
      const data = call(createUserLowdb, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUserLowdb, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    }
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    }
  }
})
