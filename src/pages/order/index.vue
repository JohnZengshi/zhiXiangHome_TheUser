<template>
  <div class="orderPage">
    <Tabs 
    ref="Tabs"
    :tabsList="tabsList" 
    itemWidth="150"
    @switchTab="switchTab">
    </Tabs>
    <swiper
        class="swiperContent"
        @change="swiperChange"
        :current="currentSwiperIndex">
        <!-- <div class="loadingBox"> -->
        <!-- <Loading v-if="true"></Loading> -->
        <!-- </div> -->
        <swiper-item
        class="swiperItemContent"
        :key="index"
        v-for="(item,index) in swiperDataList">
            <!-- <Loading 
            v-if="(item.dataList.length == 0 && item.updataTag)"
            :isLoading="item.dataList.length == 0">
            </Loading> -->
            <block v-if="item.dataList.length == 0">
            <!-- <NoData></NoData> -->
            </block>
            <block v-else>
                <ul>
                    <li 
                    :key="i"
                    v-for="(data,i) in item.dataList">
                        <div class="card display_flex">
                            <div class="left display_flex flex-direction_column align-items_center">
                            <block v-if="data.type == 1">
                                <img src="/static/images/orderPage/install-icon.png" alt="">
                                <span class="line"></span>
                                <span class="type">安装</span>
                            </block>
                            <block v-else-if="data.type == 2">
                                <img src="/static/images/orderPage/maintain-icon.png" alt="">
                                <span class="line"></span>
                                <span class="type">维修</span>
                            </block>
                            </div>
                            <div class="rigth display_flex flex-direction_column">
                            <div @click="navigatoDetail(data.order)" class="detail display_flex flex-direction_column">
                                <span class="titleName">
                                    <span class="name">{{data.titleName}}</span>
                                </span>
                                <span class="order">单号：{{data.order}}</span>
                                <span class="appointment">预约时间：{{data.appointment}}</span>
                            </div>
                            <div @click="callPhone(data.phone)" class="callPhone display_flex flex-direction_column align-items_center">
                                <img src="/static/images/orderPage/callPhoneicon.png" alt="">
                                <span>{{item.installerName}}</span>
                            </div>
                            <div class="bottom display_flex align-items_center justify-content_flex-justify">
                                <span class="type">{{data.status_txt}}</span>
                                <button 
                                    @click="clickBtn(btn,data)" 
                                    :class="{active : btn.active}" 
                                    :key="b" v-for="(btn,b) in data.btnList">{{btn.text}}</button>
                            </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </block>
        </swiper-item>
    </swiper>
    <Popup 
        v-if="showPopup"
        popType="0" 
        :customPopupData="customPopupData">
        <div slot="select">
            <CustomSelect 
                :selectPopupData="selectPopupData"
                @cancel="showPopup = false"
                @confirm="confirm"></CustomSelect>
        </div>
    </Popup>
  </div>
</template>
<script>
  import Tabs from "@/components/tabs.vue";
  import Popup from "@/components/popup";
  import CustomSelect from "@/components/common/select";
//   import NoData from "@/components/noData.vue";
//   import Loading from "@/components/loading.vue";
//   import loadingBox from "@/components/loadingBox.vue";
  import {showModal,toast,navigateTo,makePhoneCall} from "@/utils/wxapi";
  import {
    tabsList, //tabs栏数据
    order_statusList,
  } from "@/constants/orderData"
//   import {
//     getWorkOrderList,
//     receiveWorkOrder,
//     refuseWorkOrder,
//     signWorkOrder,
//     finishWorkOrder
//   } from "@/network/api";
//   import {deepClone} from "@/utils/deepClone";
  export default {
    components: {
      Tabs,
      Popup,
      CustomSelect
    //   NoData,
    //   Loading,
    //   loadingBox
    },
    data() {
      return {
        tabsList: tabsList, //tabs栏数据
        swiperDataList: tabsList, //swiper页面数据
        currentSwiperIndex: "0", //swiper当前索引
        showPopup: false, //弹窗显示
        popType: "", //弹窗类型
        // getDataListIng: false,
        currentOrder: {}, //当前操作的工单
        customPopupData:{ //自定义弹窗参数
            slotName: "select"
        },
        selectPopupData: { //自定义选择弹窗参数
          title: "请选择取消工单的原因", //弹窗标题
          key: "id", //选中的key值
          label: "value", //显示的值
          hasConfirmBtn: true,
          selectList: [{ //选中列表
            id: "0",
            value: "不需要安装了",
          },{
            id: "1",
            value: "信息填写错误",
          },{
            id: "2",
            value: "改为其他时间",
          },{
            id: "3",
            value: "其他",
          }]
        },
      }
    },
    computed: {
      getWorkOrderListParams(){ //获取工单列表参数
        return {
          openid: this.globalData.openId,
          type: "",
          status: tabsList[this.currentSwiperIndex].status
        }
      },
      receiveWorkOrderParams(){ //接单参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      refuseWorkOrderParams(){ //拒绝此单参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      signWorkOrderParams() { //工程师现场签到操作参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      },
      finishWorkOrderParams(){ //工程师确认完成操作参数
        return {
          openid: this.globalData.openId,
          worder_sn: this.currentOrder.order
        }
      }
    },
    watch: {
      currentSwiperIndex: function (value) {
        let index = value - 0;
        let isCanUpdata = this.swiperDataList[index].updataTag;
        if(isCanUpdata){
        //   this.updataWorkOrderList();
        this.getData(index)
        }else{
          return 
        }
      }
    },
    methods: {
      swiperChange(e) { //页面滑动切换时触发
        this.$refs['Tabs'].switchTab(e.target.current);
        this.currentSwiperIndex = `${e.target.current}`;
      },
      switchTab(index) { //tabs栏点击触发
        this.currentSwiperIndex = `${index}`;
      },
      clickBtn(btn,data){ //点击订单上的按钮
        let id = btn.id;
        console.log(id,data);
        // this.showPopup = true;
        this.currentOrder = data;
        this.popType = btn.popType;
        // wx.hideTabBar({})
        if (id == '0') { //取消工单
            this.showPopup = true;
            //   ;
            //   (async () => {
            //     let res = await showModal("接单", "确定接此订单吗？", true);
            //     console.log(res);
            //     if (res == 'ok') {
            //       let receiveWorkOrderRES = await receiveWorkOrder(this.receiveWorkOrderParams)
            //       if (receiveWorkOrderRES.errCode == 0) {
            //         await toast(receiveWorkOrderRES.msg, 500);
            //         await this.updataWorkOrderList();
            //         await this.autoSwiperPage();
            //       }
            //     }
            //   })()
        } else if (id == '1') { //拒绝此单
          this.showPopup = true;
          this.popupData = {
            title: "请选择拒绝工单的原因",
            key: "id",
            label: "text",
            selectList: [{
              text: "我没时间",
              id: "0"
            }, {
              text: "其他",
              id: "1"
            }]
          };
        } else if (id == '2') { //签到
          ;
          (async () => {
            let res = await showModal("签到", "确定签到吗？", true);
            if (res == 'ok') {
              let signWorkOrderRES = await signWorkOrder(this.signWorkOrderParams);
              if (signWorkOrderRES.errCode == 0) {
                await toast(signWorkOrderRES.msg, 1000);
                await this.updataWorkOrderList();
                await this.autoSwiperPage();
              }
            }
          })()
        } else if (id == '3') { //服务完成
          ;
          (async () => {
            let res = await showModal("服务完成", "确定服务完成吗？", true);
            if (res == 'ok') {
              let finishWorkOrderRES = await finishWorkOrder(this.finishWorkOrderParams);
              if (finishWorkOrderRES.errCode == 0) {
                toast(finishWorkOrderRES.msg, 500);
                await this.updataWorkOrderList();
                await this.autoSwiperPage();
              }
            }
          })()
          
        } else if (id == '4') { //评价
            navigateTo("/pages/order/evaluation/main");
            //   ;
            //   (async () => {
            //     let res = await showModal("服务完成", "确定服务完成吗？", true);
            //     if (res == 'ok') {
            //       let finishWorkOrderRES = await finishWorkOrder(this.finishWorkOrderParams);
            //       if (finishWorkOrderRES.errCode == 0) {
            //         toast(finishWorkOrderRES.msg, 500);
            //         await this.updataWorkOrderList();
            //         await this.autoSwiperPage();
            //       }
            //     }
            //   })()
        } else if (id == '5') { //删除
          ;
          (async () => {
            let res = await showModal("删除", "确定删除此订单吗？", true);
            console.log(res);
          })()
        }
      },
      hidePopup() { //隐藏弹窗
        this.showPopup = false;
        // wx.showTabBar({})
      },
      confirm(data) { //弹窗确定
        console.log(data);
        this.showPopup = false;
        // ;(async()=>{
        //   let refuseWorkOrderRES = await refuseWorkOrder(Object.assign({
        //     remark: data.text
        //   }, this.refuseWorkOrderParams))
        //   if (refuseWorkOrderRES.errCode == 0) {
        //     await toast(refuseWorkOrderRES.msg, 1000);
        //     await this.updataWorkOrderList();
        //     this.swiperDataList[tabsList.length-1].updataTag = true;
        //   }
        // })()
      },
      navigatoDetail(id) { //点击卡片跳转到工单详情
        let url = `/pages/order/orderDetail/main?orderId=${id}`;
        navigateTo(url);
      },
      getData(index){ //模拟获取数据
        // this.getDataListIng = true;
        let btnList = tabsList[index].btnList
        setTimeout(() => {
          if (this.swiperDataList[index].dataList.length == 0) {
            // this.getDataListIng = false;
            this.swiperDataList[index].updataTag = false;
            this.swiperDataList[index].dataList = [{ //模拟数据
              titleName: "智能版Q7",
              type: "1",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList,
              status_txt: "待上门",
              installerName: "john"
            }, {
              titleName: "智能版Q7",
              type: "2",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList,
              status_txt: "待上门",
              installerName: "john"
            }, {
              titleName: "智能版Q7",
              type: "1",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList,
              status_txt: "待上门",
              installerName: "john"
            }, {
              titleName: "智能版Q7",
              type: "2",
              order: "10235698566",
              appointment: "2018.125 09:00-12:00",
              address: "广东省深圳市南山区粤海街道236号",
              btnList: btnList,
              status_txt: "待上门",
              installerName: "john"
            }];
          }
        }, 0)
      },
      getWorkOrderList() {; //获取工单数据
        return (async () => {
          let getWorkOrderListRES = await getWorkOrderList(this.getWorkOrderListParams);
          console.log(getWorkOrderListRES)
          if(getWorkOrderListRES.errCode == 0){
            console.log(getWorkOrderListRES.list)
            let btnList = tabsList[this.currentSwiperIndex].btnList
            let list = getWorkOrderListRES.list.map((val)=>{
              if (this.currentSwiperIndex == '3') { //已完成的工单按钮判断
                btnList = btnList.filter((v) => {
                  if (val.has_assess == 1) {
                    return v.id == "6" //已评价
                  }else{
                    return v.id == "4" //待评价
                  }
                })
              }
              let item = {
                titleName: val.sku_name,
                type: val.work_order_type,
                order: val.worder_sn,
                appointment: val.appointment,
                address: val.address,
                phone: val.phone,
                btnList: btnList,
                status_txt: order_statusList.find((v)=>{
                  return v.status == val.work_order_status
                }).text
              };
              return item;
              
            })
            return list;
            // this.swiperDataList[this.currentSwiperIndex].dataList = list;
          }else{
            return []
          }
        })()
      },
      updataWorkOrderList() { //刷新工单数据
        return (async () => {
          if (Array.isArray(tabsList[this.currentSwiperIndex].status)) { //有多个状态
            this.swiperDataList[this.currentSwiperIndex].dataList = [];
            let statusList = tabsList[this.currentSwiperIndex].status;
            statusList.forEach(async (val) => {
              tabsList[this.currentSwiperIndex].status = val;
              let List = await this.getWorkOrderList()
              this.swiperDataList[this.currentSwiperIndex].dataList = this.swiperDataList[this.currentSwiperIndex].dataList.concat(List);
            });
            tabsList[this.currentSwiperIndex].status = statusList;
          } else {
            this.swiperDataList[this.currentSwiperIndex].dataList = await this.getWorkOrderList();
          }
          this.swiperDataList[this.currentSwiperIndex].updataTag = false; //单个页面默认滑动只刷新一次
          return true;
        })()
      },
      callPhone(phone){ //打电话
        makePhoneCall(`${phone}`)
      },
      autoSwiperPage() { //自动滑动页面
        let currentIndex = parseInt(this.currentSwiperIndex);
        if (currentIndex < tabsList.length - 1) {
          this.currentSwiperIndex = `${currentIndex + 1}`;
          this.swiperDataList[this.currentSwiperIndex].updataTag = true;
        }
      }
    },
    onLoad() {},
    onShow() {
      console.log("home-show")
      if(this.globalData.openId != ''){
        // this.updataWorkOrderList();
        
      }
      this.getData('0')
    }
  }
</script>
<style lang="less"scoped>
.orderPage {
  height: 100%;
  background-color: #F5F5F5;
  
  .swiperContent {
    // transform: translateY(94rpx);
    padding-top: 94rpx;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .loadingBox {
      width: 100%;
      height: 94rpx;
      position: relative;
    }
    .swiperItemContent {
      overflow-y: scroll;

      ul {
        box-sizing: border-box;
        padding: 0 30rpx;

        li {
          .card {
            width: 690rpx;
            height: 336rpx;
            background-color: #fff;
            border-radius: 30rpx;
            margin-top: 30rpx;
            box-shadow: 0rpx 10rpx 12rpx 0rpx rgba(193, 193, 193, 0.34);
            overflow: hidden;

            .left {
              width: 100rpx;
              height: 100%;
              background: @baseColor;

              >img {
                margin-top: 48rpx;
                width: 72rpx;
                height: 72rpx;
              }

              >.line {
                margin-top: 47rpx;
                margin-bottom: 61rpx;
                display: inline-block;
                background-color: #fff;
                width: 69rpx;
                height: 2rpx;
                opacity: 0.5;
              }

              >.type {
                font-size: 32rpx;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #fff;
              }
            }

            .rigth {
              width: 590rpx;
              height: 100%;
              padding: 0 20rpx 0 24rpx;
              position: relative;

              .detail {
                box-sizing: border-box;
                border-bottom: 1rpx solid rgba(216, 216, 216, 1);

                .titleName {
                  position: relative;
                  margin-top: 30rpx;
                  margin-bottom: 2rpx;

                  .name {
                    margin-right: 12rpx;
                    font-size: 42rpx;
                    line-height: 63rpx;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(77, 61, 51, 1);
                  }
                }

                .order,
                .appointment{
                  font-size: 26rpx;
                  line-height: 37rpx;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(197, 197, 199, 1);
                  margin-top: 10rpx;
                }

                .appointment {
                  margin-bottom: 20rpx;
                }

              }

              .bottom {
                height: 119rpx;
                button {
                  float: right;
                  width: 225rpx;
                  height: 79rpx;
                  background: rgba(240, 240, 240, 1);
                  box-shadow: 0rpx 18rpx 50rpx 0rpx rgba(193, 193, 193, 0.34);
                  border-radius: 40rpx;
                  font-size: 32rpx;
                  margin: 24rpx;
                  color: rgba(77, 61, 51, 1);

                  &.active {
                    background: @baseColor;
                    box-shadow:0rpx 18rpx 50rpx 0rpx rgba(30,163,255,0.4);
                    color: #fff;
                  }
                }

                .type{
                    font-size:27rpx;
                    font-family:PingFangSC-Semibold;
                    font-weight:600;
                    color:rgba(239,92,92,1);
                }
              }

              .callPhone {
                position: absolute;
                right: 20rpx;
                top: 20rpx;

                >img {
                  width: 82rpx;
                  height: 82rpx;
                }

                >span {
                  margin-top: 14rpx;
                  font-size: 20rpx;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  color: rgba(197, 197, 199, 1);
                }
              }
            }
          }

          &:last-of-type {
            margin-bottom: 30rpx;
          }


        }
      }
    }
  }
  
}

</style>
