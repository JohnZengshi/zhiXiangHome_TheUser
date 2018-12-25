<template>
  <div class="minePage">
    <div class="userVia display_flex flex-direction_column align-items_center justify-content_flex-justify">
      <div class="via display_flex flex-direction_column justify-content_flex-center align-items_center">
        <div>
          <open-data type="userAvatarUrl"></open-data>
        </div>
      </div>
      <span class="name">
        <open-data type="userNickName"></open-data>
      </span>

    </div>
    <div class="menuList">
      <ul>
        <li @click="concentKF" class="display_flex justify-content_flex-justify align-items_center">
          <div class="display_flex align-items_center">
            <img src="/static/images/mainPage/contactCustomerService-icon.png" alt="">
            <span>联系客服</span>
          </div>
          <div class="display_flex align-items_center">
            <span>400-2365-5698</span>
            <img src="/static/images/mainPage/arrows.png" alt="">
          </div>
        </li>
        <navigator url="/pages/mine/aboutUs/main">
          <li class="display_flex justify-content_flex-justify align-items_center">
            <div class="display_flex align-items_center">
              <img src="/static/images/mainPage/aboutUs.png" alt="">
              <span>关于我们</span>
            </div>
            <div class="display_flex align-items_center">
              <img src="/static/images/mainPage/arrows.png" alt="">
            </div>
          </li>
        </navigator>
        <navigator url="/pages/mine/mineSetting/main">
          <li class="display_flex justify-content_flex-justify align-items_center">
            <div class="display_flex align-items_center">
              <img src="/static/images/mainPage/setting-icon.png" alt="">
              <span>设置</span>
            </div>
            <div class="display_flex align-items_center">
              <img src="/static/images/mainPage/arrows.png" alt="">
            </div>
          </li>
        </navigator>
      </ul>
    </div>
  </div>
</template>
<script>
  import {
    makePhoneCall
  } from "@/utils/wxapi";
  export default {
    computed: {},
    methods: {
      concentKF() {
        makePhoneCall("400-2365-5698")
      }
    },
    onLoad() {}
  }
</script>
<style lang="less" scoped>
  .minePage {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;

    .userVia {
      width: 750rpx;
      height: 412rpx;
      background-color: @baseColor;

      .via {
        width: 262rpx;
        height: 262rpx;
        border-radius: 50%;
        background-color: rgba(78, 62, 51, 0.2);
        margin-top: 32rpx;
        overflow: hidden;

        >div {
          width: 240rpx;
          height: 240rpx;
          background-color: #fff;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .name {
        font-size: 34rpx;
        color: #4D3D33;
        line-height: 48rpx;
        margin-bottom: 46rpx;
        font-family: @fontFamily;
        font-weight: 600;
      }
    }

    .menuList {
      margin-top: 16rpx;

      >ul {
        li {
          width: 100%;
          height: 94rpx;
          background-color: #FFFFFF;
          box-sizing: border-box;

          >div {
            &:first-of-type {
              img {
                width: 54rpx;
                height: 54rpx;
                margin-left: 30rpx;
              }

              >span {
                font-size: 32rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(77, 61, 51, 1);
                margin-left: 30rpx;
              }
            }

            &:last-of-type {
              >span {
                font-size: 32rpx;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(77, 61, 51, 1);
                margin-right: 17rpx;
              }

              img {
                width: 13rpx;
                height: 23rpx;
                margin-right: 30rpx;
              }
            }
          }
        }
      }
    }
  }
</style>