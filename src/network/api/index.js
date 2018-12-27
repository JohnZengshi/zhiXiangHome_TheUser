/**
 * Created by guangqiang on 2017/10/3.
 */

import {
  getFetch,
  postFetch,
  putFetch,
  postFetchFromCache,
  getFetchFromCache,
  postFetchForValidator
} from '../request/HttpExtension';
import {
  PATH
} from '../config/pathConfig';
import {
  ApiSource
} from '../config/commonType';
import {
  publicParams
} from "../config/publicParams.js";

const getThirdOpenid = (params = {}) => { //获取Openid
  params.method = 'getThirdOpenid';
  return postFetch('', Object.assign(params, publicParams), true);
};

const authorized = (params = {}) => { //第三方账号授权登录
  params.method = 'authorized';
  return postFetch('', Object.assign(params, publicParams), true);
};

const bindPhone = (params = {}) => { //手机号绑定
  params.method = 'bindPhone';
  return postFetch('', Object.assign(params, publicParams), true);
};

const changePhone = (params = {}) => { //更换手机号
  params.method = 'changePhone';
  return postFetch('', Object.assign(params, publicParams), true);
}

const sendSmsCode = (params = {}) => { //发送短信验证码
  params.method = 'sendSmsCode';
  return postFetch('', Object.assign(params, publicParams), true);
};

const checkSmsCode = (params = {}) => { //短信验证码验证
  params.method = 'checkSmsCode';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getUserProfile = (params = {}) => { //获取个人资料
  params.method = 'getUserProfile';
  return postFetch('', Object.assign(params, publicParams), true);
};

const uploadImage = (params = {}) => { //图片上传
  params.method = 'uploadImage';
  return postFetch('', Object.assign(params, publicParams), true);
}


/**----------------------工单管理------------ */

/**----------------------地址管理------------ */
const getRegions = (params = {}) => { //地址列表
  params.method = 'getRegions';
  return postFetchFromCache('', Object.assign(params, publicParams), true);
}

const getOneRegions = (params = {}) => { //地址列表
  params.method = 'getRegions';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getUserAddressList = (params = {}) => { //地址列表
  params.method = 'getUserAddressList';
  return postFetch('', Object.assign(params, publicParams), true);
}

const updateUserAddress = (params = {}) => {
  params.method = 'updateUserAddress';
  return postFetch('', Object.assign(params, publicParams), true);
}

const delUserAddress = (params = {}) => {
  params.method = 'delUserAddress';
  return postFetch('', Object.assign(params, publicParams), true);
}

export {
  getThirdOpenid,
  authorized,
  bindPhone,
  changePhone,
  sendSmsCode,
  checkSmsCode,
  getUserProfile,
  getRegions,
  getOneRegions,
  getUserAddressList,
  updateUserAddress,
  delUserAddress
}