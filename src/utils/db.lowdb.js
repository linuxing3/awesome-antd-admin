import { routeList } from './routes'
import { ApiPrefix, adminUsers } from './constant'

const db = {
  [`POST ${ApiPrefix}/user/login`]({ url, method, params, data }) {
    const { username, password } = data
    const user = adminUsers.filter(item => item.username === username)
    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      let token = JSON.stringify({ id: user[0].id, deadline: now.getTime() })
      // res.cookie(
      //   'token',
      //   token,
      //   {
      //     maxAge: 900000,
      //     httpOnly: true,
      //   }
      // )
      return {
        success: true,
        message: 'Ok',
        token
      }
    } else {
      return {
        status: 400
      }
    }
  },

  [`GET ${ApiPrefix}/user/logout`]({ method, url, params, data }) {
    return {
      success: true,
      status: 200
    }
  },

  [`GET ${ApiPrefix}/user`]({ method, url, params, data }) {
    let user = {}
    const userItem = adminUsers.find(_ => _.id === 1)
    if (userItem) {
      const { password, ...other } = userItem
      user = other
    }
    return {
      success: true,
      status: 200,
      data: {
        user
      }
    }
  },

  [`GET ${ApiPrefix}/users`]({ method, url, params, data }) {
    return {
      success: true,
      status: 200,
      data: {
        list: adminUsers
      }
    }
  },

  [`POST ${ApiPrefix}/users/delete`]({ method, url, params, data }) {
    return {
      success: true,
      status: 204,
      data
    }
  },

  [`POST ${ApiPrefix}/user`]({ method, url, params, data }) {
    return {
      success: true,
      status: 202
    }
  },

  [`GET ${ApiPrefix}/user/:id`]({ method, url, params, data }) {
    return {
      success: true,
      status: 200,
      data
    }
  },

  [`DELETE ${ApiPrefix}/user/:id`]({ method, url, params, data }) {
    return {
      success: true,
      status: 204,
      data
    }
  },

  [`PATCH ${ApiPrefix}/user/:id`]({ method, url, params, data }) {
    return {
      success: true,
      status: 200,
      data
    }
  },

  [`GET ${ApiPrefix}/routes`]({ method, url, params, data }) {
    return {
      success: true,
      status: 200,
      data: {
        list: routeList
      }
    }
  }
}

export default db
