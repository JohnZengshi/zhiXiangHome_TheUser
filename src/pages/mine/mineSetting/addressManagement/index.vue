<template>
  <div class="addressManagement">
    <div class="addressList">
      <ul>
        
          <li 
            :key="index"
            v-for="(item,index) in addressList">
            <div class="item">
              <div class="top">
                <div>
                  <span>{{item.userName}}</span>
                  <span>{{item.phone}}</span>
                </div>
                <span>{{item.address}}</span>
              </div>
              <div class="bottom display_flex align-items_center justify-content_flex-justify">
                <div>
                  <SelectBox 
                  :ref="'SelectBox_' + index"
                  model="oneSelect" 
                  :text="item.isDefaule?'默认地址':'设为默认'" 
                  @selectBack="selectBack(index)"
                  :autoSelect='item.isDefaule'></SelectBox>
                </div>
                <div class="btn display_flex">
                  <navigator url="/pages/mine/mineSetting/addressManagement/addressOperation/main?addressId='11111'" open-type="navigate" hover-class="none">
                    <div class="editor display_flex align-items_center justify-content_flex-center">
                        <img src="/static/images/minePage/editor-icon.png" alt="">
                        <span>编辑</span>
                    </div>
                  </navigator>
                  <div @click="delAddress(index)" class="del display_flex align-items_center justify-content_flex-center">
                    <img src="/static/images/minePage/del-icon.png" alt="">
                    <span>删除</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
      </ul>
    </div>
    <div class="btn">
      <navigator
        url="/pages/mine/mineSetting/addressManagement/addressOperation/main"
        open-type="navigate"
        hover-class="none">
        <button class="confirmBtn">新增地址</button>
      </navigator>
    </div>
  </div>
</template>
<script>
  import SelectBox from "@/components/select.vue";
  import {showModal} from "@/utils/wxapi";
  export default {
    data() {
      return {
        moni_addressList: [{
          userName: "孟德01",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: true,
        }, {
          userName: "孟德02",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德03",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德04",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德05",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德06",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德07",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, {
          userName: "孟德08",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        }, ]
      }
    },
    components: {
      SelectBox
    },
    computed: {
      addressList() {
        let list = this.moni_addressList.map((val) => {
          return {
            userName: val.userName,
            phone: val.phone,
            address: val.address,
            isDefaule: val.isDefaule,
          }
        })
        return list;
      }
    },
    methods: {
      selectBack(index) { //设置默认地址
        console.log("选中",index);
        let isDefaule = this.moni_addressList[index].isDefaule;
        if(!isDefaule){ //每一项初始化
          this.moni_addressList.forEach(val => {
            val.isDefaule = isDefaule;
          });
        }
        // 设置当前项
        this.moni_addressList[index].isDefaule = !isDefaule;
      },
      delAddress(index) { //删除地址
        ;(async()=>{
          let res = await showModal("删除地址", "确定删除改地址吗？", true, "#1EA3FF");
          console.log(res);
          if (res == 'ok') {
            this.moni_addressList.splice(index, 1);
          }
        })()
      }
    }
  }
</script>
<style lang="less" scoped>
  .addressManagement {
      width: 100%;
      height: 100%;
      background:rgba(245,245,245,1);
      .addressList{
          // height: 1059rpx;
          margin-bottom: 147rpx;
          overflow-y: scroll;
          ul{
              li{
                  margin-bottom: 16rpx;
                  > .item {
                    width: 750 rpx;
                    height: 257 rpx;
                    background: rgba(255, 255, 255, 1);
                    .top{
                        height: 158rpx;
                        padding: 30rpx;
                        box-sizing: border-box;
                        border-bottom: 1rpx solid rgba(238,238,238,1);
                        >div{
                            span{
                                font-size:32rpx;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                &:first-of-type{
                                    margin-right: 36rpx;
                                }
                            }
                        }
                        >span{
                            font-size:26rpx;
                            font-family:PingFangSC-Regular;
                            font-weight:400;
                        }
                    }
                    .bottom{
                        height: 98rpx;
                        padding: 0 30rpx;
                        font-size:26rpx;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        .btn{
                          color: #fff;
                          .editor,.del{
                            width: 138rpx;
                            height: 54rpx;
                            background: @baseColor;
                            border-radius:27rpx;
                            img{
                              width: 30rpx;
                              height: 30rpx;
                              margin-right: 7rpx;
                            }
                          }
                          .editor{
                            margin-right: 20rpx;
                          }
                        }
                    }
                  }
              }
          }
      }
      >.btn {
        box-sizing: border-box;
        padding: 0 40rpx;
        width: 100%;
        position: fixed;
        bottom: 53rpx;

        .confirmBtn {
          width: 670rpx;
          // margin-top: 20rpx
        }
      }
  }
</style>