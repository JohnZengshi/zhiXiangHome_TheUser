/**
 * Created by guangqiang on 2017/10/1.
 */

const host = {
  dev: {
    API_URL: '',
    XIAMI_URL: '',
    MSITE_URL: '',
    VENILOG_URL: '',
    appId: '',
    envVersion: 'develop'
  },
  test: {
    API_URL: '',
    XIAMI_URL: '',
    MSITE_URL: '',
    VENILOG_URL: '',
    appId: '',
    envVersion: 'develop'
  },
  qa: {
    API_URL: '',
    XIAMI_URL: '',
    MSITE_URL: '',
    VENILOG_URL: ''
  },
  pre: {
    API_URL: '',
    XIAMI_URL: '',
    MSITE_URL: '',
    VENILOG_URL: '',
    appId: '',
    envVersion: 'develop'
  },
  prd: {
    API_URL: 'http://api.smarlife.cn',
    XIAMI_URL: '',
    MSITE_URL: '',
    VENILOG_URL: '',
    appId: '',
    envVersion: 'trial'
  }
}

let ENV = 'prd'
let currentHost = host[ENV]

const SET_HOST = (env = 'dev') => {
  ENV = env
  currentHost = host[ENV]
}

const API_URL = currentHost.API_URL
const XIAMI_URL = currentHost.XIAMI_URL
const MSITE_URL = currentHost.MSITE_URL
const VENILOG_URL = currentHost.VENILOG_URL
export {
  ENV,
  API_URL,
  MSITE_URL,
  VENILOG_URL,
  XIAMI_URL,
  SET_HOST,
  currentHost
}