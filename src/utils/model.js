import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10
    }
  },

  reducers: {
    querySuccess(state, { payload }) {
      console.log(payload)
      // NOTE
      // To use the state in a namespaced module, must use [namespace.list]
      // In other words, in the page/index.js file, use [namespace] as props
      // instead of directly use [list] as props
      // @connect({namespace})
      // @connect(({ user }) => ({ user }))
      return {
        ...state,
        list: payload.list,
        pagination: {
          ...state.pagination,
          ...payload.pagination
        }
      }
    }
  }
})
