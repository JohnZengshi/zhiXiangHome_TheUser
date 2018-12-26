<template>
  <div class="orderDetailPage">
    <block v-if="true">
      <!-- 工单详情 -->
      <div class="detial display_flex flex-direction_column">
        <span class="title">工单详情</span>
        <!-- <ul>
          <li 
          :key="index"
          v-for="(item,index) in orderData.detail"
          v-if="!item.hide">
            <div class="item display_flex justify-content_flex-justify align-items_center">
              <div class="display_flex align-items_center">
                <span class="line"></span>
                <span class="text">{{item.title}}</span>
              </div>
              <span class="text">{{item.value}}</span>
            </div>
          </li>
        </ul> -->
        <TableList
            :dataList="orderData.detail"></TableList>
      </div>
      <!-- 服务地址 -->
      <div class="adress display_flex flex-direction_column">
        <span class="title">服务地址</span>
        <span class="des">{{orderData.adress}}</span>
      </div>
      <!-- 安装/维修说明 -->
      <div 
        :class="{noData:(orderData.instructions.des == '' && orderData.instructions.pic.length == 0)}"
        class="instructions display_flex flex-direction_column">
        <span v-if="orderData.instructions.type == 1" class="title">安装说明</span>
        <span v-else-if="orderData.instructions.type == 2" class="title">维修说明</span>
        <block v-if="orderData.instructions.des != '' || orderData.instructions.pic.length != 0">
          <span class="des">{{orderData.instructions.des}}</span>
          <div class="pic">
            <ul>
              <li 
                :key="index"
                v-for="(item,index) in orderData.instructions.pic">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
        </block>
        <block v-else>
          <NoData text="暂无说明"></NoData>         
        </block>
      </div>
      <!-- 评价 -->
      <div 
        :class="{noData:!orderData.evaluation}"
        class="evaluation display_flex flex-direction_column">
        <span class="title">评价</span>
        <block v-if="orderData.evaluation">
          <div 
            class="evaluationList"
            :key="index"
            v-for="(item,index) in orderData.evaluation.graded">
            <span class="title">{{item.title}}</span>
            <Graded 
              :imgs="imgs" 
              :width="15" 
              :height="15" 
              :starValue="1" 
              :initScroe="item.score"
              :isClick="false"
              @ok="back"></Graded>
          </div>
          <div class="evaluationBox line display_flex flex-direction_column">
            <span class="des title">用户评价：</span>
            <span class="des">{{orderData.evaluation.des}}</span>
          </div>
          <div class="evaluationBox display_flex flex-direction_column">
            <span class="des title">追加评价：</span>
            <span class="des">{{orderData.evaluation.additionalDes}}</span>
          </div>
        </block>
        <block v-else>
          <NoData text="暂无评价"></NoData>
        </block>
      </div>
    </block>
    <block v-else>
      <NoData></NoData>
    </block>
  </div>
</template>
<script>
  import Graded from "@/components/graded.vue";
  import TableList from "@/components/tableList"
//   import {getWorkOrderDetail} from "@/network/api";
  import NoData from "@/components/noData";
  export default {
    data() {
      return {
        imgs:["/static/images/components/star-gray-icon.png","","/static/images/components/star-glod-icon.png"],
        orderId: "",
        orderDetail: null,
      }
    },
    components:{
      Graded,
      NoData,
      TableList
    },
    computed: {
      orderData() {
        if (this.orderDetail) {
          const detail = this.orderDetail.detail;
          const installer = this.orderDetail.installer;
          const sku = this.orderDetail.sku;
          const assess_list = this.orderDetail.assess_list;
          
          return {
            detail: [{
              title: "状态",
              value: detail.status_txt
            }, {
              title: "工单编号",
              value: detail.worder_sn
            }, {
              title: "售后类型",
              value: detail.work_order_type == 1 ? '安装' : '维修'
            }, {
              title: "设备分类",
              value: sku.name
            }, {
              title: "业主姓名",
              value: detail.user_name
            }, {
              title: "联系电话",
              value: detail.phone
            }, {
              title: "预约时间",
              value: detail.appointment
            }, {
              title: "完成时间",
              value: detail.finish_timem,
              hide: detail.work_order_type != 4 ? true : false,
            }],
            adress: detail.address,
            instructions: {
              type: detail.work_order_type,
              des: detail.fault_desc,
              pic: detail.images
            },
            evaluation: assess_list.length == 0 ? null : {
              graded: assess_list[0].configs.map((val) => {
                return {
                  title: val.name,
                  score: val.score,
                }
              }),
              des: assess_list[0].msg,
              additionalDes: assess_list[1].msg,
            }
          }
        }else{
          return {
            detail: [{
              title: "状态",
              value: "",
              model: "text"
            }, {
              title: "工单编号",
              value: "",
              model: "text"
            }, {
              title: "售后类型",
              value: "",
              model: "text"
            }, {
              title: "设备分类",
              value: "",
              model: "text"
            }, {
              title: "业主姓名",
              value: "",
              model: "text"
            }, {
              title: "联系电话",
              value: "",
              model: "text"
            }, {
              title: "预约时间",
              value: "",
              model: "text"
            }, {
              title: "完成时间",
              value: "",
              model: "text"
            //   hide: detail.work_order_type != 4 ? true : false,
            }],
            adress: "",
            instructions: {
              type: 1,
              des: "",
              pic: []
            },
            evaluation: {
              graded: [{
                title: "这是评价",
                score: 5,
              }],
              des: "这是评价描述",
              additionalDes: "这是追加评价",
            }
          }
        }
      },
      getWorkOrderDetailParams(){
        return {
          openid: this.globalData.openId,
          worder_sn: this.orderId,
        }
      }
    },
    methods:{
      back(){
        
      }
    },
    onLoad(option) {
      console.log(`工单id:${option.orderId}`);
    //   this.orderId = option.orderId;
    //   ;(async()=>{
    //     let getWorkOrderDetailRES = await getWorkOrderDetail(this.getWorkOrderDetailParams);
    //     console.log(getWorkOrderDetailRES);
    //     if(getWorkOrderDetailRES.errCode == 0){
    //       this.orderDetail = getWorkOrderDetailRES;
    //       console.log(this.orderDetail);
    //     }else{

    //     }
    //   })()
    }
  }
</script>
<style lang="less" scoped>
  .orderDetailPage {
    width: 100%;
    height: 100%;
    .detial,.adress,.instructions,.evaluation{
        >.title{
            padding-left: 30rpx;
            width: 100%;
            height: 56rpx;
            line-height: 56rpx;
            font-size:24rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(77,61,51,1);
            background: rgba(241, 241, 241, 1);
        }
        .des{
            padding: 30rpx;
            font-size:27rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(77,61,51,1);
        }
    }
    .detial{
        >ul{
            li{
                height: 94rpx;
                padding: 0 30rpx;
                box-sizing: border-box;
                >.item{
                    height: 100%;
                    border-bottom: 1rpx solid rgba(241, 241, 241, 1);
                    >div{
                        .line{
                            display: inline-block;
                            width:6rpx;
                            height:50rpx;
                            margin-right: 16rpx;
                            background:rgba(245,208,133,1);
                        }
                    }
                    .text{
                        font-size:27rpx;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(77,61,51,1);
                    }
                }
            }
        }
    }
    .instructions{
        &.noData{
          height: 470rpx;
        }
        .pic{
          ul{
            padding: 0 107rpx;
            >li{
              float: left;
              width: 253rpx;
              height: 253rpx;
              margin-right: 30rpx;
              margin-bottom: 30rpx;
              &:nth-of-type(2n){
                margin-right: 0;
              }
              >img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
    }
    .evaluation{
        &.noData{
          height: 345rpx;
        }
        .evaluationList{
            padding: 30rpx;
            border-bottom: 1rpx solid rgba(241, 241, 241, 1);
            >.title{
                font-size:27rpx;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(77,61,51,1);
            }
            ul{
                li {
                  width: 30rpx;
                  height: 30rpx;
                  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zdGFyLWdyYXktaWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSLluIjlgoXnq6/lsI/nqIvluo8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLlt6XljZXor6bmg4Ut5biI5YKF56uvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUwLjAwMDAwMCwgLTE3MjguMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJzdGFyLeacqumAieS4rS1pY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTAuMDAwMDAwLCAxNzI4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjRDhEOEQ4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSLmmJ/lvaIiIGZpbGw9IiNDNUM1QzciIHBvaW50cz0iMTUgMjIuNSA2LjE4MzIyMTIyIDI3LjEzNTI1NDkgNy44NjcwNzYxMyAxNy4zMTc2Mjc1IDAuNzM0MTUyMjU2IDEwLjM2NDc0NTEgMTAuNTkxNjEwNiA4LjkzMjM3MjU0IDE1IDAgMTkuNDA4Mzg5NCA4LjkzMjM3MjU0IDI5LjI2NTg0NzcgMTAuMzY0NzQ1MSAyMi4xMzI5MjM5IDE3LjMxNzYyNzUgMjMuODE2Nzc4OCAyNy4xMzUyNTQ5Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  -moz-background-size: 100% 100%;
                }
            }
        }

        .evaluationBox{
          .title{
            padding: 30rpx 0 0 30rpx;
          }
          &.line{
            border-bottom: 1rpx solid #f1f1f1;
          }
        }
    }
  }
</style>