import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

/**
 * 参考`src/services/index.js`文件，对api配置进行遍历，
 * 每个属性都返回对应的封装后的request函数。
 * @param {string} params url like 'POST /user/login'
 * @returns {Function<Promise<any>>} result
 */
const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  // paramsArray = ['POST', '/usr/login']
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

APIFunction.queryWeather = params => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params
  })
}

export default APIFunction
