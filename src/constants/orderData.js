let btnList = [{
    text: "取消工单",
    id: "0",
    popType: "", //弹窗类型
    active: false,
  }, {
    text: "拒绝此单",
    id: "1",
    popType: "1", //弹窗类型
    active: false,
  }, {
    text: "签到",
    id: "2",
    popType: "", //弹窗类型
    active: true,
  }, {
    text: "服务完成",
    id: "3",
    popType: "", //弹窗类型
    active: true,
  }, {
    text: "待评价",
    id: "4",
    popType: "", //弹窗类型
    active: true,
  }, {
    text: "追加评价",
    id: "7",
    popType: "", //弹窗类型
    active: true,
  }, {
    text: "删除",
    id: "5",
    popType: "2", //弹窗类型
    active: false,
  }, {
    text: "已评价",
    id: "6",
    popType: "", //弹窗类型
    active: true,
  }
];
let tabsList = [{
    text: "全部",
    id: "-1",
    dataList: [],
    btnList: btnList.filter((val) => {
      return val.id == '0'
    }),
    updataTag: true, //限制滑动是否可以刷新数据
    status: "",
  }, {
    text: "待接单",
    id: "0",
    dataList: [],
    btnList: btnList.filter((val) => {
      return val.id == '0'
    }),
    updataTag: true, //限制滑动是否可以刷新数据
    status: 1,
  },
  {
    text: "待上门",
    id: "1",
    dataList: [],
    btnList: btnList.filter((val) => {
      return val.id == '0'
    }),
    updataTag: true,
    status: 2,
  },
  {
    text: "进行中",
    id: "2",
    dataList: [],
    btnList: btnList.filter((val) => {
      return val.id == '3'
    }),
    updataTag: true,
    status: 3,
  },
  {
    text: "已完成",
    id: "3",
    dataList: [],
    btnList: btnList.filter((val) => {
      return val.id == '4' || val.id == '7'
    }),
    updataTag: true,
    status: 4,
  },
  {
    text: "已取消",
    id: "4",
    dataList: [],
    btnList: [],
    updataTag: true,
    status: -1,
  },
];
let order_statusList = [{
  text: "待分派",
  status: 0,
  active: true,
},{
  text: "待接单",
  status: 1,
  active: true,
}, {
  text: "待上门",
  status: 2,
  active: true,
}, {
  text: "进行中",
  status: 3,
  active: true,
}, {
  text: "已完成",
  status: 4,
  active: false,
}, {
  text: "已拒绝",
  status: -2,
  active: false,
}, {
  text: "分派转移",
  status: -3,
  active: false,
}, {
  text: "已取消",
  status: -1,
  active: false,
}]
module.exports = {
  tabsList,
  btnList,
  order_statusList
}