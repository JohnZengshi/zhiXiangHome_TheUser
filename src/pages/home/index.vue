<template>
  <div class="homePage">
    <div class="top">
      <img src="/static/images/homePage/banne.png" alt="">
    </div>
    <div class="serviceList display_flex flex-direction_column align-items_center">
      <span class="title">请选择售后类型：</span>
      <ul>
        <li>
          <div class="item display_flex">
            <div class="content display_flex align-items_center">
              <img class="smallIcon" src="/static/images/homePage/maintenance-icon.png" alt="">
              <span class="line"></span>
              <span class="title">维修</span>
            </div>
            <img class="bigIcon" src="/static/images/homePage/maintenance-big-icon.png" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less" scoped>
  .homePage {
    width: 100%;
    height: 100%;
    background:rgba(245,245,245,1);
    .top{
      img{
        width:750rpx;
        height:388rpx;
      }
    }
    .serviceList{
      >.title{
        font-size:32rpx;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(135,135,135,1);
        margin-top: 45rpx;
        margin-bottom: 18rpx;
        line-height: 45rpx;
      }
      ul{
        li{
          padding: 0 30rpx;
          >.item{
            width:690rpx;
            height:265rpx;
            background: @baseColor;
            box-shadow:0rpx 17rpx 24rpx 0rpx rgba(30,163,255,0.55);
            border-radius:30rpx;
            .content {
              margin-top: 57rpx;
              margin-left: 56rpx;
              margin-right: 28rpx;
              height: 73rpx;
              .smallIcon {
                width: 72rpx;
                height: 72rpx;
                margin-right: 53rpx;
              }

              .line {
                display: inline-block;
                width: 2rpx;
                height: 73rpx;
                background-color: #fff;
                margin-right: 50rpx;
              }

              .title {
                font-size: 42rpx;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
              }
            }
            .bigIcon{
              width:288rpx;
              height:204rpx;
              margin-top: 61rpx;
            }
          }
        }
      }
    }
  }
</style>