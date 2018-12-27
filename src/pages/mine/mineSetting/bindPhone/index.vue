<template>
  <div class="changePhonePage">
    <ul>
      <li class="display_flex justify-content_flex-justify align-items_center">
        <input v-model="phone" type="number" placeholder="请输入手机号" placeholder-class="placeholderClass001">
        <SendCode 
          ref="SendCode"
          @getSendCode="getSendCode" 
          :phoneNum="phone"></SendCode>
      </li>
      <li>
        <input v-model="code" type="text" placeholder="请输入验证码" placeholder-class="placeholderClass001">
      </li>
    </ul>
    <button @click="confirm" class="btn confirmBtn">提交</button>
  </div>
</template>
<script>
    import {
      changePhone,
      bindPhone,
      sendSmsCode,
      checkSmsCode,
      getUserProfile
    } from "@/network/api";
  import {
    switchTab,
    navigateTo,
    navigateBack,
    toast,
    setNavigationBarTitle
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
          type: "bind_phone",
        }
      },
      checkSmsCodeParams() { //验证验证码参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          code: this.code,
          type: "bind_phone"
        }
      },
      bindPhoneParams() { //绑定手机参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
        }
      },
      changePhoneParams() { //更换手机参数
        return {
          openid: this.globalData.openId,
          phone: this.phone,
          old_phone: this.globalData.userInfo ? this.globalData.userInfo.phone : "",
        }
      },
      getUserProfileParams() { //获取用户信息参数
        return {
          openid: this.globalData.openId,
        }
      }
    },
    methods: {
      getSendCode() {; //获取验证码
        (async () => {
          let sendSmsCodeRES = await sendSmsCode(this.sendSmsCodeParams)
          console.log(sendSmsCodeRES);
          if (sendSmsCodeRES.errCode == 0) {
            toast(sendSmsCodeRES.msg);
          } else {
            toast(sendSmsCodeRES.errMsg)
          }
        })()
      },
      bindPhone() { //绑定手机
        ;
        (async () => {
          let bindPhoneRES = await bindPhone(this.bindPhoneParams);
          if (bindPhoneRES.errCode == 0) {
            await toast(bindPhoneRES.msg, 1000);
            // navigateBack();
            switchTab("/pages/home/main");
            this.phone = "";
            this.code = "";
            this.$refs['SendCode'].resetSendCode();
          } else {
            toast(bindPhoneRES.msg)
          }
        })()
      },
      changePhone() { //更换手机
        ;
        (async () => {
          let changePhoneRES = await changePhone(this.changePhoneParams);
          if (changePhoneRES.errCode == 0) {
            await toast(changePhoneRES.msg, 1000);
            await navigateBack();
            this.phone = "";
            this.code = "";
            this.$refs['SendCode'].resetSendCode();
            this.getUserProfile();
          } else {
            toast(changePhoneRES.msg)
          }
        })()
      },
      getUserProfile() { //获取用户信息
        ;
        (async () => {
          let getUserProfileRES = await getUserProfile(this.getUserProfileParams); //获取个人信息
          if (getUserProfileRES.errCode == 0) {
            let profile = getUserProfileRES.profile;
            this.globalData.userInfo = profile;
            console.log(this.globalData.userInfo)
          } else {
            toast(getUserProfileRES.errMsg)
          }
        })()
      },
      confirm() {
        let isPhone = RegExpr.checkMobile(this.phone)
        if (!isPhone) {
          toast("请输入正确的手机号")
        } else if (this.code == '') {
          toast("验证码不能为空")
        } else {
          console.log("输入无误");;
          (async () => {
            let checkSmsCodeRES = await checkSmsCode(this.checkSmsCodeParams);
            if (checkSmsCodeRES.errCode == 0) { //验证码正确
              if (this.bindPhoneType == 'bindPhone') {
                this.bindPhone();
              }else if(this.bindPhoneType == 'changePhone'){
                this.changePhone();
              }
            } else {
              toast(checkSmsCodeRES.msg)
            }

          })()
        }
      }
    },
    onShow(){
      this.bindPhoneType = this.$root.$mp.query.type;
      if(this.bindPhoneType == 'bindPhone'){
        setNavigationBarTitle("绑定手机号");
      }else if(this.bindPhoneType == 'changePhone'){
        setNavigationBarTitle("更换手机号");
      }
    },
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
    >.btn{
      margin-top: 70rpx;
    }
  }
</style>