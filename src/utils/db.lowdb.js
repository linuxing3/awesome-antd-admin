const ApiPrefix = '/api/v1'

let users = [
  {
    username: 'antd',
    password: 'antd'
  }
]

const queryArray = (array, key, keyAlias = 'key') => {
  let data
  if (!(array instanceof Array)) {
    return null
  }

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request'
}

module.exports = {
  [`POST ${ApiPrefix}/user/login`](req, res) {
    const { username, password } = req.body
    const user = users.filter(item => item.username === username)

    if (user.length > 0 && user[0].password === password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      // set cookie
      res.cookie(
        'token',
        JSON.stringify({ id: user[0].id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true
        }
      )
      res.json({ success: true, message: 'Ok' })
    } else {
      res.status(400).end()
    }
  },

  [`GET ${ApiPrefix}/user/logout`](req, res) {
    // clear cookie
    res.clearCookie('token')
    res.status(200).end()
  },

  // find methods by id
  [`GET ${ApiPrefix}/user`](req, res) {
    const response = {
      success: true,
      message: '',
      statusCode: 200,
      data: users
    }
    return res.json(response)
  },

  [`GET ${ApiPrefix}/users`](req, res) {
    const response = {
      success: true,
      message: '',
      statusCode: 200,
      data: users
    }
    return res.json(response)
  },

  [`POST ${ApiPrefix}/users/delete`](req, res) {
    const { ids = [] } = req.body
    users = users.filter(item => !ids.some(_ => _ === item.id))
    const response = {
      success: true,
      message: '',
      statusCode: 200,
      data: users
    }
    return res.json(response)
  },

  // create
  [`POST ${ApiPrefix}/user`](req, res) {
    const { newUser } = req.body
    users.push(newUser)
    const response = {
      success: true,
      message: '',
      statusCode: 200,
      data: users
    }
    return res.json(response)
  },

  // findOne
  [`GET ${ApiPrefix}/user/:id`](req, res) {
    const { id } = req.params
    const user = queryArray([], id, 'id')
    const response = {
      success: true,
      message: '',
      statusCode: 200,
      data: user
    }
    return res.json(response)
  },

  [`DELETE ${ApiPrefix}/user/:id`](req, res) {
    const { id } = req.params
    const found = queryArray([], id, 'id')
    if (found) {
      const response = {
        success: true,
        message: '',
        statusCode: 200,
        data: found
      }
      res.json(response)
    } else {
      res.status(200).json(NOTFOUND)
    }
  },

  [`PATCH ${ApiPrefix}/user/:id`](req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    let data = [].map(item => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.json({
        status: 200,
        data
      })
    } else {
      res.status(200).json(NOTFOUND)
    }
  }
}
