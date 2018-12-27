<template>
  <div class="addressDetailPage">
    <TableList 
        ref="TableList"
        :dataList="dataList"
        @textblur="textblur"
        :initDataFun="initInputDataFun"></TableList>
    <div class="setDefault display_flex align-items_center">
      <SelectBox
        model="oneSelect"
        :text="moniData.isdefault?'默认地址':'设为默认'"
        :autoSelect="moniData.isdefault"
        @selectBack="moniData.isdefault = !moniData.isdefault"
        :initDataFun="initSelectDataFun"></SelectBox>
    </div>
    <div class="btn">
      <button @click="confirmBtn" class="confirmBtn">保存新地址</button>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  import TableList from "@/components/tableList";
  import SelectBox from "@/components/select";
  import {
    getOneRegions,
    updateUserAddress
  } from "@/network/api";
  import {
    toast,
    navigateBack
  } from "@/utils/wxapi";
  import {
    RegExpr
  } from "@/utils/regex";
  export default {
    data() {
      return {
        moniData: {
            userName:"",
            phone: "",
            area: "",
            address: "",
            addressID: "",
            isdefault: false
        },
        initMoniData: {
          userName: "",
          phone: "",
          area: "",
          address: ""
        }
      }
    },
    components: {
      TableList,
      SelectBox
    },
    computed: {
      ...mapState({
        cityList: state => state.regions.list //城市列表
      }),
      dataList() {
        return [{
          key: "userName",
          title: "姓名",
          value: this.moniData.userName,
          initValue: this.initMoniData.userName,
          placeholder: "请输入姓名",
          model: "input",
        }, {
          key: "phone",
          title: "联系电话",
          value: this.moniData.phone,
          initValue: this.initMoniData.phone,
          placeholder: "请输入联系电话",
          inputType: "number",
          model: "input",
        }, {
          key: "area",
          title: "所在地区",
          value: this.moniData.area,
          initValue: this.initMoniData.area,
          placeholder: "请选择地址",
          model: "select",
          selectMode: "region" //选择城市
        }, {
          key: "address",
          title: "详细地址：",
          value: this.moniData.address,
          initValue: this.initMoniData.address,
          placeholder: "请输入详细地址",
          model: "input",
        }, ]
      },
      initInputDataFun() { //初始化执行函数（页面onshow，其组件的数据不一定更新，因此要等待执行此函数）
        return () => {
          let addressId = this.$root.$mp.query.addressId;
          console.log('地址Id',addressId);
          if (addressId) {
            this.$set(this.moniData, 'userName', "老治安");
            this.$set(this.moniData, 'phone', "1234567890")
            this.$set(this.moniData, 'area', "广东深圳")
            this.$set(this.moniData, 'address', "德赛大厦");
            this.$set(this.moniData, 'isdefault', true);


            this.$set(this.initMoniData, 'userName', "老治安");
            this.$set(this.initMoniData, 'phone', "1234567890");
            this.$set(this.initMoniData, 'area', "广东深圳");
            this.$set(this.initMoniData, 'address', "德赛大厦");

            // this.$refs['TableList'].initInputItem(this.dataList);
          } else {
            this.$set(this.moniData, 'userName', "");
            this.$set(this.moniData, 'phone', "")
            this.$set(this.moniData, 'area', "")
            this.$set(this.moniData, 'address', "")
            this.$set(this.moniData, 'isdefault', false);

            this.$set(this.initMoniData, 'userName', "");
            this.$set(this.initMoniData, 'phone', "")
            this.$set(this.initMoniData, 'area', "")
            this.$set(this.initMoniData, 'address', "")

            // this.$refs['TableList'].initInputItem(this.dataList);
          }
        }
      },
      initSelectDataFun() { //初始化执行函数
        return () => {
          let addressId = this.$root.$mp.query.addressId;
          console.log('地址Id', addressId);
          if (addressId) {
            this.$set(this.moniData, 'isdefault', true);
          } else {
            this.$set(this.moniData, 'isdefault', false);
          }
        }
      },
      updateUserAddressParams() { //地址列表请求参数
        return {
          openid: this.globalData.openId,
          name: this.moniData.userName,
          phone: this.moniData.phone,
          region_id: this.moniData.addressID,
          address: this.moniData.address,
        }
      }
    },
    methods: {
      textblur(val,key){ //输入框完成输入回调
          let item = this.dataList.find((v)=>{
              return v.key == key
          });
          if(key == 'area'){
              ;(async()=>{
                let addressID =await this.getFinalRegions(val)
                this.moniData.addressID = addressID;
              })()
              this.moniData[item.key] =  val.join("");
          }else{
              this.moniData[item.key] =  val
          }
      },
      getFinalRegions(valList) {
        // valList.forEach(async (val) => {})//forEach不会阻塞循环,不能用
        return (async () => {
          let cityList = this.cityList;
          let parent_id;
          let parent_idList = [];
          for (let i = 0; i < valList.length; i++) {
            let item = cityList.find((v) => {
              return v.region_name == valList[i]
            });
            parent_id = item.region_id;
            parent_idList.push(parent_id);
            let getOneRegionsRES = await getOneRegions({
              parent_id
            });
            cityList = getOneRegionsRES.list;
            console.log(parent_idList);
          };
          return parent_idList[parent_idList.length - 1]
        })()
      },
      confirmBtn() { //保存按钮
        const toastFun = (key) => {
          toast(this.dataList.find(v => {
            return v.key == key
          }).placeholder);
        }
        if (this.moniData.userName == '') {
          toastFun('userName')
        } else if (!RegExpr.checkUserName(this.moniData.userName)) {
          toast("输入姓名包含特殊字符")
        } else if (this.moniData.phone == '') {
          toastFun('phone')
        } else if (!RegExpr.checkMobile(this.moniData.phone)) {
          toast("请输入正确的手机号码")
        } else if (this.moniData.area == '') {
          toastFun('area')
        } else if (this.moniData.address == '') {
          toastFun('address')
        } else {
          console.log("输入无误",this.moniData)
          ;
          (async () => {
            let updateUserAddressRES = await updateUserAddress(this.updateUserAddressParams);
            if (updateUserAddressRES.errCode == 0) {
              let res = await toast(updateUserAddressRES.msg, 500)
              console.log(res)
              if (res) {
                navigateBack();
              }
            } else {
              toast(updateUserAddressRES.errMsg);
            }
          })()
        }

      },
    },
    onLoad(option) {},
    onShow() {
      console.log(this.cityList)
    },
    mounted() {},
    onUnload() {},
  }
</script>
<style lang="less" scoped>
  .addressDetailPage {
    width: 100%;
    height: 100%;
    background:rgba(245,245,245,1);
    .setDefault{
      width: 100%;
      height: 98rpx;
      padding: 0 30rpx;
      font-size:26rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(77,61,51,1);
      background: #fff;
    }
    .btn {
      width: 100%;
      position: fixed;
      bottom: 53rpx;
      .confirmBtn {
        width: 670rpx;
      }
    }
    
  }
</style>