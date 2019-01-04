<template>
  <div class="indexPage display_flex justify-content_flex-center">
      <img src="/static/images/mainPage/LOGO.png" alt="">
  </div>
</template>
<script>
  import {
    mapMutations
  } from "vuex";
  import {
    login,
    toast,
    redirectTo,
    switchTab,
    removeStorage
  } from "@/utils/wxapi";
  import {
    getThirdOpenid,
    authorized,
    getUserProfile,
    getRegions
  } from "@/network/api";
  export default {
    data(){
      return {
        code: "",
      }
    },
    computed: {
      getThirdOpenidParams() { //获取openId参数
        return {
          type: "2",
          code: this.code,
        }
      },
      authorizedParams() { //第三方账号授权登录参数
        return {
          user_type: "user",
          third_type: "wechat_applet",
          appid: this.globalData.appid,
          third_openid: this.globalData.openId,
          // nickname: "",
          // avatar: "",
          // gender: "",
          // unionid: ""
        }
      },
      getUserProfileParams() { //获取用户信息参数
        return {
          openid: this.globalData.openId,
        }
      }
    },
    methods: { //获取地址列表
      ...mapMutations([
        'listUpdata'
      ]),
      getRegions() {;
        (async () => {
          let getRegionsRES = await getRegions();
          // console.log(getRegionsRES);
          if(getRegionsRES.errCode == 0){
            this.listUpdata(getRegionsRES.list)
          }else{
            removeStorage("getRegions");
            toast(getRegionsRES.errMsg);
          }
        })()
      }
    },
    onLoad() {
      this.getRegions(); //获取地址列表
      (async () => {
        let loginRES = await login();
        this.code = loginRES.code;
        let getThirdOpenidRES = await getThirdOpenid(this.getThirdOpenidParams) //获取openId
        if (getThirdOpenidRES.errCode == 0) {
          this.globalData.openId = getThirdOpenidRES.third_openid; //全局保存openId
          this.globalData.appid = getThirdOpenidRES.appid; //全局保存appid
          console.log("已获取openid,appid");
          let authorizedRES = await authorized(this.authorizedParams); //登录
          console.log(authorizedRES)
          if (authorizedRES.errCode == 0) {
            this.globalData.openId = authorizedRES.openid; //覆盖全局openId
            let profile = authorizedRES.profile;

            if (Array.isArray(profile) && profile.length == 0) { //没有相关信息，手机未绑定
              console.log("未绑定手机,跳转到手机绑定页面");
              // await toast('未绑定手机', 500);
              redirectTo("/pages/mine/mineSetting/bindPhone/main?type=bindPhone");
            } else { //有相关信息，手机已绑定
              console.log("手机已绑定")
              // let profile = await UserInfoUpdata(this.getUserProfileParams);
              let getUserProfileRES = await getUserProfile(this.getUserProfileParams); //获取个人信息
              if (getUserProfileRES.errCode == 0) {
                let profile = getUserProfileRES.profile;
                this.globalData.userInfo = profile;
                // this.engineerStatusFilter(profile);
                switchTab("/pages/home/main")
              } else {
                toast(getUserProfileRES.errMsg)
              }
            }


          } else {
            toast(authorizedRES.errMsg)
          }
        } else {
          toast(getThirdOpenidRES.errMsg)
        }

        console.log(this.globalData);
      })();
      
    },
    created() {
      console.log("app created and cache logs by setStorageSync");
    },
  }
</script>

<style lang="less" scoped>
  .indexPage {
    width: 100%;
    height: 100%;
    background: @baseColor;
    img{
        margin-top: 321rpx;
        width:184rpx;
        height:251rpx;
    }
  }
</style>