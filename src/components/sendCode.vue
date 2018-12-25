
<template>
  <!-- 发送验证码组件 -->
  <button
    :class="{timekeeping:timekeeping}"
    @click="getSendCode" 
    class="sendCode">{{countDown}}</button>
</template>
<script>
  import {
    RegExpr,
  } from "@/utils/regex.js";
  import {
    toast
  } from "@/utils/wxapi.js"
  export default {
    props: {
      phoneNum: { //需要发送的手机号
        type: String,
        default: () => {
          return ""
        },
        required: true
      }
    },
    data() {
      return {
        initTime: 60,
        time: 60,
        timekeeping: false, //计时过程中不可点击
      }
    },
    computed: {
      countDown() {
        if (!this.timekeeping) {
          return "发送验证码"
        } else {
          return `重新发送(${this.time})s`
        }
      }
    },
    methods: {
      getSendCode() {
        if (!this.timekeeping) {
          let isPhone = RegExpr.checkMobile(this.phoneNum);
          console.log(isPhone);
          if (isPhone) {
            this.timekeeping = true; //计时开始
            this.$emit("getSendCode");
            let interval = setInterval(() => {
              if (this.time == 0) {
                this.time = this.initTime;
                this.timekeeping = false; //计时结束
                clearInterval(interval);
              } else {
                this.time--;
              }
            }, 1000);
          } else {
            toast("手机号输入不正确")
          }
        } 
      }
    }
  }
</script>
<style lang="less" scoped>
  .sendCode {
    width: 215rpx;
    transition: all 0.2s;
    &.timekeeping {
      width: 320rpx;
    }
  }
</style>