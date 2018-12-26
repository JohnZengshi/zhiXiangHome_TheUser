/** Created by guangqiang on 2018-06-29 18:17:42 */

import {
  timestampToCommonDate
} from "@/utils/formatTime"
import {
  _array
} from "@/utils/arrayExtension"

const getStorage = key => new Promise((resolve, reject) => {
  wx.getStorage({
    key: key,
    success(res) {
      resolve(res.data)
    },
    fail(e) {
      reject(e)
    }
  })
})

const setStorage = (key, value) => new Promise((resolve, reject) => {
  wx.setStorage({
    key: key,
    data: value,
    success() {
      resolve()
    },
    fail(e) {
      reject(e)
    }
  })
})

const removeStorage = key => new Promise((resolve, reject) => {
  wx.removeStorage({
    key: key,
    success(res) {
      resolve(res.data)
    },
    fail(e) {
      reject(e)
    }
  })
})

const clearStorage = () => new Promise((resolve, reject) => {
  try {
    wx.clearStorageSync()
    resolve()
  } catch (e) {
    reject(e)
  }
})

const getLocation = () => new Promise((resolve) => {
  wx.getLocation({
    type: "wgs84",
    success({
      latitude,
      longitude,
      speed,
      accuracy
    }) {
      resolve({
        latitude,
        longitude,
        speed,
        accuracy
      })
    },
    fail() {
      resolve({
        latitude: -999,
        longitude: -999
      })
    }
  })
})

const chooseLocation = () => new Promise((resolve, reject) => {
  wx.chooseLocation({
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const openLocation = ({
  latitude,
  longitude
}) => new Promise((resolve, reject) => {
  wx.openLocation({
    latitude: latitude,
    longitude: longitude,
    scale: 18,
    success: function (res) {
      resolve(res)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const login = () => new Promise((resolve, reject) => {
  wx.login({
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const getUserInfo = obj => new Promise((resolve, reject) => {
  wx.getUserInfo({
    ...obj,
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const addCard = (cardId = '', cardExt = '', ) => new Promise((resolve, reject) => {
  wx.addCard({
    cardList: [{
      cardId: cardId,
      cardExt: cardExt
    }],
    success: function (res) {
      resolve(res)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const chooseImage = (count = 1, sourceType = ['album']) => new Promise((resolve, reject) => {
  wx.chooseImage({
    count,
    sourceType,
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const handleScan = () => new Promise((resolve, reject) => {
  wx.scanCode({
    success: function (res) {
      resolve(res)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const showModal = (title, content, isCancel, confirmColor = '#F5D085') => new Promise(resolve => {
  wx.showModal({
    title: title,
    content: content,
    showCancel: isCancel,
    confirmColor: confirmColor,
    success: function (res) {
      if (res.confirm) {
        resolve('ok')
      } else if (res.cancel) {
        resolve('cancle')
      }
    }
  })
})

const toast = (content, time = 4000) => new Promise((resolve, reject) => {
  wx.showToast({
    title: content,
    icon: 'none',
    duration: time,
    success: function (res) {
      setTimeout(() => {
        resolve(res)
      }, time)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const toastSuccess = content => new Promise((resolve, reject) => {
  wx.showToast({
    title: content,
    icon: 'success',
    duration: 3000,
    success: function (res) {
      resolve(res)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const actionSheet = items => new Promise((resolve, reject) => {
  wx.showActionSheet({
    itemList: items,
    success: function (res) {
      resolve(res.tapIndex)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const showShareMenu = () => {
  return wx.showShareMenu
}

const pageScrollTo = () => {
  return wx.pageScrollTo
}

const alert = content => new Promise((resolve, reject) => {
  wx.showModal({
    title: '',
    content,
    showCancel: false,
    success: function (res) {
      resolve(res)
    },
    fail: function (e) {
      reject(e)
    }
  })
})

const navigateTo = url => {
  wx.navigateTo({
    url
  })
}

const navigateBack = (delta = 1) => {
  wx.navigateBack({
    delta: delta
  })
}

const redirectTo = url => {
  wx.redirectTo({
    url: url
  })
}

const switchTab = url => {
  wx.switchTab({
    url: url
  })
}

const reLaunch = url => {
  wx.reLaunch({
    url: url
  })
}
const startPullDownRefresh = () => new Promise((resolve, reject) => {
  wx.startPullDownRefresh({
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const stopPullDownRefresh = () => new Promise((resolve, reject) => {
  wx.stopPullDownRefresh({
    success(res) {
      resolve(res)
    },
    fail(e) {
      reject(e)
    }
  })
})

const request = params => new Promise((resolve, reject) => {
  wx.showNavigationBarLoading()
  const beforeRequest = new Date().getTime()
  wx.request({
    url: params.url,
    data: params.data,
    header: {
      'Content-Type': 'application/json',
      ...params.header
    },
    method: params.method,
    success: function (res) {
      let isSuccess = false
      if (parseInt(res.statusCode / 100) == 2) {
        if (res.data.code == 0) {
          isSuccess = true
        }
      }

      let response = res.data
      response.statusCode = res.statusCode
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const route = currentPage.route
      const networkType = wx.getStorageSync('networkType')
      const afterRequest = new Date().getTime()
      const timeDif = afterRequest - beforeRequest
      var networkArr = wx.getStorageSync('networkArr') || []
      if (networkArr.length >= 30) {
        wx.removeStorageSync('networkArr')
        networkArr = []
      }
      var time = timestampToCommonDate(new Date().getTime())
      networkArr = _array.unshift(networkArr, {
        url: params.url,
        params: params.data,
        res: response,
        time,
        route,
        timeDif,
        networkType,
        isSuccess
      })
      wx.setStorageSync('networkArr', networkArr)

      if (!isSuccess) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 4000
        })
      }
      wx.hideNavigationBarLoading()
      resolve(res.data)
    },
    fail: function (e) {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const route = currentPage.route
      const networkType = wx.getStorageSync('networkType')
      const afterRequest = new Date().getTime()
      const timeDif = afterRequest - beforeRequest
      var networkArr = wx.getStorageSync('networkArr') || []
      if (networkArr.length >= 30) {
        wx.removeStorageSync('networkArr')
        networkArr = []
      }
      var time = timestampToCommonDate(new Date().getTime())
      networkArr = _array.unshift(networkArr, {
        url,
        params,
        res: e,
        time,
        route,
        timeDif,
        networkType,
        isSuccess: false
      })
      wx.setStorageSync('networkArr', networkArr)

      wx.showToast({
        title: e.errMsg,
        icon: 'none',
        duration: 4000
      })
      wx.hideNavigationBarLoading()
      reject(e)
    }
  })
})

const checkNetWork = () => new Promise((resolve, reject) => {
  wx.getNetworkType({
    success: function (res) {
      let networkType = res.networkType
      if (networkType === 'none' || networkType === 'unknown') {
        resolve(false)
      } else {
        resolve(true)
      }
    },
    fail: function (e) {
      resolve(false)
    }
  })
})

const uploadFile = params => new Promise((resolve, reject) => {
  wx.showLoading({
    title: '图片正在上传...',
    mask: true
  })
  wx.uploadFile({
    ...params,
    success: function (res) {
      resolve(JSON.parse(res.data));
      wx.hideLoading()
    },
    fail: function (e) {
      reject(e);
      wx.hideLoading()
    }
  })
})

const saveImage = url => {
  wx.downloadFile({
    url: url,
    success: function (res) {
      let path = res.tempFilePath;
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success(res) {
          toastSuccess('保存成功！')
        },
        fail(res) {
          toast('保存失败！')
        }
      });
    },
    fail: function (res) {
      toast('保存失败！')
    }
  });
}

const checkSession = () => new Promise((resolve, reject) => {
  wx.checkSession({
    success: function () {
      // session_key 未过期，并且在本生命周期一直有效
      resolve(true)
    },
    fail: function () {
      // session_key 已经失效，需要重新执行登录流程
      resolve(false)
    }
  })
})

const makePhoneCall = (phoneNumber) => new Promise((resolve,reject) => {
  wx.makePhoneCall({
    phoneNumber: phoneNumber,
    success: function () {
      resolve(true)
    },
    fail: function () {
      resolve(false)
    }
  })
})

const setNavigationBarTitle = title => new Promise((resolve, reject) => {
  wx.setNavigationBarTitle({
    title: title,
    success: function () {
      resolve(true)
    },
    fail: function () {
      reject(false)
    }
  })
})

const createSelectorQuery_fields = nodeName => new Promise((resolve, reject) => {
  wx.createSelectorQuery().select(nodeName).fields({
    dataset: true,
    size: true,
    scrollOffset: true,
    rect: true,
    properties: [],
    computedStyle: [],
    context: true,
  }, function (res) {
    res.dataset // 节点的dataset
    res.width // 节点的宽度
    res.height // 节点的高度
    res.scrollLeft // 节点的水平滚动位置
    res.scrollTop // 节点的竖直滚动位置
    res.scrollX // 节点 scroll-x 属性的当前值
    res.scrollY // 节点 scroll-y 属性的当前值
    // 此处返回指定要返回的样式名
    res.margin
    res.backgroundColor
    res.context // 节点对应的 Context 对象
    resolve(res);
  }).exec()
})
export {
  getStorage,
  setStorage,
  getLocation,
  chooseLocation,
  openLocation,
  removeStorage,
  clearStorage,
  login,
  request,
  chooseImage,
  showShareMenu,
  pageScrollTo,
  getUserInfo,
  alert,
  navigateTo,
  navigateBack,
  redirectTo,
  switchTab,
  reLaunch,
  startPullDownRefresh,
  stopPullDownRefresh,
  uploadFile,
  handleScan,
  checkNetWork,
  addCard,
  showModal,
  toast,
  toastSuccess,
  actionSheet,
  saveImage,
  checkSession,
  makePhoneCall,
  setNavigationBarTitle,
  createSelectorQuery_fields,
}