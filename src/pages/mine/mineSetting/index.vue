<template>
  <div class="mineSettingPage">
    <ul>
      <navigator url="/pages/mine/mineSetting/addressManagement/main">
        <li>
          <div class="display_flex justify-content_flex-justify align-items_center">
            <span>地址管理</span>
            <img src="/static/images/mainPage/arrows.png" alt="">
          </div>
        </li>
      </navigator>
      <navigator url="/pages/mine/mineSetting/bindPhone/main?type=changePhone">
        <li>
          <div class="display_flex justify-content_flex-justify align-items_center">
            <span>更换手机号</span>
            <img src="/static/images/mainPage/arrows.png" alt="">
          </div>
        </li>
      </navigator>
    </ul>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less" scoped>
  .mineSettingPage {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;

    ul {
      li {
        width: 100%;
        height: 94rpx;
        background-color: #fff;

        >div {
          box-sizing: border-box;
          margin: 0 30rpx;
          height: 100%;
          border-bottom: 1rpx solid #E4E4E4;

          >span {
            font-size: 27rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(77, 61, 51, 1);
          }

          >img {
            width: 13rpx;
            height: 23rpx;
          }
        }

        &:last-of-type {
          >div {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>