import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'

const {
  queryUserListLowdb,
  updateUserLowdb,
  createUserLowdb,
  removeUserLowdb,
  removeUserListLowdb
} = api

export default modelExtend(pageModel, {
  // NOTE:
  // use [namespace] path to access the state
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
      // use yield before
      // The response is data instead of { success: , data: }
      const response = yield call(queryUserListLowdb, payload)
      console.log(response)
      if (response) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: response.list,
            pagination: {
              current: 1,
              pageSize: 10,
              total: response.list.length
            }
          }
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeUserLowdb, { id: payload })
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
      const data = yield call(removeUserListLowdb, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: data } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      // yield createUser here
      const data = yield call(createUserLowdb, payload)
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
