<template>
  <div class="changePhonePage">
    <ul>
      <li class="display_flex justify-content_flex-justify align-items_center">
        <input v-model="phone" type="number" placeholder="请输入手机号" placeholder-class="placeholderClass001">
        <SendCode @getSendCode="getSendCode" :phoneNum="phone"></SendCode>
      </li>
      <li>
        <input v-model="code" type="text" placeholder="请输入验证码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button @click="confirm" class="confirmBtn">提交</button>
  </div>
</template>
<script>
  //   import {
  //     changePhone,
  //     sendSmsCode,
  //     checkSmsCode
  //   } from "@/network/api";
  import {
    navigateTo,
    navigateBack,
    toast
  } from "@/utils/wxapi.js";
  import {
    RegExpr
  } from "@/utils/regex.js"
  import SendCode from "@/components/sendCode.vue";
  export default {
    data() {
      return {
        phone: "",
        code: "",
      }
    },
    components: {
      SendCode,
    },
    computed: {
      sendSmsCodeParams() { //发送短信验证码参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          type: "change_phone",
        }
      },
      checkSmsCodeParams() { //验证验证码参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          code: this.code,
          type: "change_phone"
        }
      },
      changePhoneParams() { //更换手机参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          old_phone: this.globalData.userInfo ? this.globalData.userInfo.phone : "",
        }
      }
    },
    methods: {
      getSendCode() {; //获取验证码
        // (async () => {
        //   let sendSmsCodeRES = await sendSmsCode(this.sendSmsCodeParams)
        //   console.log(sendSmsCodeRES);
        //   if (sendSmsCodeRES.errCode == 0) {
        //     toast(sendSmsCodeRES.msg);
        //   } else {
        //     toast(sendSmsCodeRES.errMsg)
        //   }
        // })()
      },
      confirm() {
        // let isPhone = RegExpr.checkMobile(this.phone)
        // if (!isPhone) {
        //   toast("请输入正确的手机号")
        // } else if (this.code == '') {
        //   toast("验证码不能为空")
        // } else {
        //   console.log("输入无误");;
        //   (async () => {
        //     let checkSmsCodeRES = await checkSmsCode(this.checkSmsCodeParams);
        //     if (checkSmsCodeRES.errCode == 0) {
        //       let changePhoneRES = await changePhone(this.changePhoneParams);
        //       if (changePhoneRES.errCode == 0) {
        //         await toast(changePhoneRES.msg, 1000);
        //         navigateBack();
        //       } else {
        //         toast(changePhoneRES.msg)
        //       }
        //     } else {
        //       toast(checkSmsCodeRES.msg)
        //     }

        //   })()
        // }
      }
    }
  }
</script>
<style lang="less" scoped>
  .changePhonePage {
    width: 100%;
    height: 100%;
    padding: 36rpx 30rpx;
    box-sizing: border-box;

    >ul {
      li {
        margin-top: 26rpx;
        border-bottom: 1rpx solid #E4E4E4;

        input {
          height: 94rpx;
          width: 100%;
        }
      }
    }
  }
</style>