<template>
  <div class="aboutUsPage">
    <div class="content"></div>
    <div class="detial display_flex flex-direction_column">
      <ul>
        <li :key="index" v-for="(item,index) in detail">
          <div class="item display_flex justify-content_flex-justify align-items_center">
            <div class="display_flex align-items_center">
              <span v-if="!item.noLine" class="line"></span>
              <span class="text">{{item.title}}</span>
            </div>
            <span class="text">{{item.value}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        detail: [{
          title: "电话：",
          value: "1234567890"
        }, {
          title: "邮箱：",
          value: "xxxxxxx@qq.com"
        }, {
          title: "网址：",
          value: "www.xxxxxxxx.com"
        }, {
          title: "详细地址：",
          value: "广东省深圳市南山区南山街道南山校区32栋3单元204室",
          noLine: true,
        }, ]
      }
    },

  }
</script>
<style lang="less" scoped>
  .aboutUsPage {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;

    .content {
      padding: 30rpx;
      background-color: #fff;
      font-size: 27rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(77, 61, 51, 1);
    }

    .detial {
      background-color: #fff;

      >.title {
        padding-left: 30rpx;
        width: 100%;
        height: 56rpx;
        line-height: 56rpx;
        font-size: 24rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(77, 61, 51, 1);
        background: rgba(241, 241, 241, 1);
      }

      >ul {
        li {
          height: 94rpx;
          padding: 0 30rpx;
          box-sizing: border-box;

          >.item {
            height: 100%;
            border-bottom: 1rpx solid rgba(241, 241, 241, 1);

            >div {
              .line {
                display: inline-block;
                width: 6rpx;
                height: 50rpx;
                margin-right: 16rpx;
                background: @baseColor;
              }
            }

            .text {
              font-size: 27rpx;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(77, 61, 51, 1);
              text-align: right;
            }

            >.text {
              max-width: 470rpx;
            }
          }
        }
      }
    }
  }
</style>