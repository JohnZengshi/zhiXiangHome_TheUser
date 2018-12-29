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
const postWorkOrder = (params = {}) => { //用户提交维修工单
  params.method = 'postWorkOrder';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getWorkOrderGoodsList = (params = {}) => { //获取可维修产品列表
  params.method = 'getWorkOrderGoodsList';
  return postFetch('', Object.assign(params, publicParams), true);
} 

const getWorkOrderList = (params = {}) => { //工单列表
  params.method = 'getWorkOrderList';
  return postFetch('', Object.assign(params, publicParams), false);
}

const cancelWorkOrder = (params = {}) => { //取消工单操作
  params.method = 'cancelWorkOrder';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getWorkOrderDetail = (params = {}) => { //工单详情
  params.method = 'getWorkOrderDetail';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getWorkOrderAssessConfig = (params = {}) => { //获取工单评价评分配置
  params.method = 'getWorkOrderAssessConfig';
  return postFetch('', Object.assign(params, publicParams), true);
}

const assessWorkOrder = (params = {}) => { //客户评价工单操作
  params.method = 'assessWorkOrder';
  return postFetch('', Object.assign(params, publicParams), true);
}

/**----------------------地址管理------------ */
const getRegions = (params = {}) => { //地址区域列表
  params.method = 'getRegions';
  return postFetchFromCache('', Object.assign(params, publicParams), true);
}

const getOneRegions = (params = {}) => { //单个地址区域列表
  params.method = 'getRegions';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getUserAddressList = (params = {}) => { //用户地址列表
  params.method = 'getUserAddressList';
  return postFetch('', Object.assign(params, publicParams), true);
}

const updateUserAddress = (params = {}) => { //新增/编辑地址
  params.method = 'updateUserAddress';
  return postFetch('', Object.assign(params, publicParams), true);
}

const delUserAddress = (params = {}) => { //删除地址
  params.method = 'delUserAddress';
  return postFetch('', Object.assign(params, publicParams), true);
}

const getUserAddressDetail = (params = {}) => {
  params.method = 'getUserAddressDetail';
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
  uploadImage,
  postWorkOrder,
  getWorkOrderGoodsList,
  getWorkOrderList,
  getWorkOrderDetail,
  getWorkOrderAssessConfig,
  cancelWorkOrder,
  assessWorkOrder,
  getRegions,
  getOneRegions,
  getUserAddressList,
  updateUserAddress,
  delUserAddress,
  getUserAddressDetail,
}