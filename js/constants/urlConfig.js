/**
 * Created by tangyuhui on 2018/12/20.
 */
const host = {
  dev: {
    API_URL: 'http://bsafes.tsg.cfpamf.com'
  },
  test: {
    API_URL: 'http://bsafes.tsg.cfpamf.com'
  },
  product: {
    API_URL: 'https://safes.xiangzhu.org.cn'
  } 
}

let ENV = 'dev'
let currentHost = host[ENV]

const setHost = (env = 'dev') => {
  ENV = env
  currentHost = host[ENV]
}

const API_URL = currentHost.API_URL
 
export {ENV, API_URL, setHost}