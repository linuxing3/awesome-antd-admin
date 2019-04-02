import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

import qs from 'qs'

// using lowdb as backend api
import db from 'utils/db.lowdb'

const { CancelToken } = axios
window.cancelRequest = new Map()

/**
 * Request with lowdb
 * 1. exported by utils/index
 * 2. called by services/index to gen full api path
 * 3. called by dva models
 * 4. called by UI
 * @param {object} options request options
 * @returns {Promise} data from lowddb query request
 */
export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel
    })
  })

  try {
    // TODO
    // let response = axios.get(options)
    // Lowdb Mock Api Server
    console.log(options)
    let methodWithUrl = options.method + ' ' + options.url
    let response = db[methodWithUrl](options)
    console.log(response)

    const { statusText, status, data } = response
    let result = {}
    if (typeof data === 'object') {
      result = data
      if (Array.isArray(data)) {
        result.list = data
      }
    } else {
      result.data = data
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...result
    })
  } catch (error) {
    const { response_2, message } = error
    if (String(message) === CANCEL_REQUEST_MESSAGE) {
      return {
        success: false
      }
    }
    let msg
    let statusCode
    if (response_2 && response_2 instanceof Object) {
      const { data, statusText } = response_2
      statusCode = response_2.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    /* eslint-disable */
    return Promise.reject({
      success: false,
      statusCode,
      message: msg
    })
  }
}

/**
 * Request Options
 * @typedef requestOptions
 * @property {any} data data
 * @property {string} url url
 * @property {string} method method
 */
const requestOptions = {
  data: {},
  url: '',
  method: 'PUT',
  params: {},
  baseUrl: '',
  auth: {
    username: '',
    password: ''
  },
  proxy: {
    host: '',
    port: 0,
    auth: {
      username: '',
      password: ''
    }
  },
  cancelToken: ''
}

const reponseSchema = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {}
}
