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
                  model="oneSelect" 
                  text="默认地址" 
                  @selectBack="selectBack"
                  :defaultSelect='item.isDefaule'></SelectBox>
                </div>
                <div class="btn display_flex">
                  <navigator url="/pages/mine/mineSetting/addressManagement/addressDetail/main" open-type="navigate" hover-class="none">
                    <div class="editor display_flex align-items_center justify-content_flex-center">
                        <img src="/static/images/minePage/editor-icon.png" alt="">
                        <span>编辑</span>
                    </div>
                  </navigator>
                  <div class="del display_flex align-items_center justify-content_flex-center">
                    <img src="/static/images/minePage/del-icon.png" alt="">
                    <span>删除</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
      </ul>
    </div>
    <navigator
      url="/pages/mine/mineSetting/addressManagement/addAddress/main"
      open-type="navigate"
      hover-class="none">
      <button class="confirmBtn">新增地址</button>
    </navigator>
  </div>
</template>
<script>
  import SelectBox from "@/components/select.vue";
  export default {
    data() {
      return {

      }
    },
    components: {
      SelectBox
    },
    computed: {
      addressList() {
        return [{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: true,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: true,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: true,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: true,
        },{
          userName: "孟德",
          phone: "180****0586",
          address: "广东省深圳市南山区德赛科技大厦2202",
          isDefaule: false,
        },]
      }
    },
    methods: {
      selectBack() {
        console.log("选中")
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
          height: 1059rpx;
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
                            margin-right: 20rpx;
                            img{
                              width: 30rpx;
                              height: 30rpx;
                              margin-right: 7rpx;
                            }
                          }
                        }
                    }
                  }
              }
          }
      }
      .confirmBtn{
        width: 670rpx;
        margin-top: 20rpx
      }
  }
</style>