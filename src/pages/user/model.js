/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomAvatar() {
  // https://uifaces.co
  const avatarList = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://d3iw72m71ie81c.cloudfront.net/female-17.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://pbs.twimg.com/profile_images/835224725815246848/jdMBCxHS.jpg',
    'https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png',
    'https://d3iw72m71ie81c.cloudfront.net/male-5.jpg',
    'https://images.pexels.com/photos/413723/pexels-photo-413723.jpeg?h=350&auto=compress&cs=tinysrgb',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
    'https://pbs.twimg.com/profile_images/943227488292962306/teiNNAiy.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg'
  ]
  return avatarList[randomNumber(0, avatarList.length - 1)]
}

export const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    avatar: randomAvatar()
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    avatar: randomAvatar()
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    avatar: randomAvatar()
  }
]

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
      const data = adminUsers
      if (data.length > 0) {
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
      const data = [1]
      if (data.length > 0) {
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
      const data = [1]
      if (data.length > 0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: data } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      // yield createUser here
      const data = 1
      if (data.length > 0) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = [1]
      if (data) {
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
