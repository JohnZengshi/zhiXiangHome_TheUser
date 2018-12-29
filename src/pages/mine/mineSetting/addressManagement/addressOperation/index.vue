<template>
  <div class="addressDetailPage">
    <TableList 
        ref="TableList"
        :dataList="dataList"
        @textblur="textblur"></TableList>
    <div class="setDefault display_flex align-items_center">
      <SelectBox
        model="oneSelect"
        :text="fromData.isdefault?'默认地址':'设为默认'"
        :autoSelect="fromData.isdefault"
        @selectBack="fromData.isdefault = !fromData.isdefault"></SelectBox>
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
    updateUserAddress,
    getUserAddressDetail
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
        addressId: "",
        fromData: {
            userName:"",
            phone: "",
            area: "",
            areaID: "",
            address: "",
            isdefault: false
        },
        initfromData: {
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
      dataList() { //数据列表
        return [{
          key: "userName",
          title: "姓名",
          value: this.fromData.userName,
          initValue: this.initfromData.userName,
          placeholder: "请输入姓名",
          model: "input",
        }, {
          key: "phone",
          title: "联系电话",
          value: this.fromData.phone,
          initValue: this.initfromData.phone,
          placeholder: "请输入联系电话",
          inputType: "number",
          model: "input",
        }, {
          key: "area",
          title: "所在地区",
          value: this.fromData.area,
          initValue: this.initfromData.area,
          placeholder: "请选择地址",
          model: "select",
          selectMode: "region" //选择城市
        }, {
          key: "address",
          title: "详细地址：",
          value: this.fromData.address,
          initValue: this.initfromData.address,
          placeholder: "请输入详细地址",
          model: "input",
        }, ]
      },
      updateUserAddressParams() { //编辑新增地址请求参数
        return {
          openid: this.globalData.openId,
          address_id: this.addressId?this.addressId:"",
          name: this.fromData.userName,
          phone: this.fromData.phone,
          region_id: this.fromData.areaID,
          region_name: this.fromData.area,
          address: this.fromData.address,
          isdefault: this.fromData.isdefault ? 1 : 0
        }
      },
      getUserAddressDetailParams() { //获取地址详情参数
        return {
          openid: this.globalData.openId,
          address_id: this.addressId
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
                let areaID =await this.getFinalRegions(val)
                this.fromData.areaID = areaID;
              })()
              this.fromData[item.key] =  val.join(" ");
          }else{
              this.fromData[item.key] =  val
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
            // console.log(parent_idList);
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
        if (this.fromData.userName == '') {
          toastFun('userName')
        } else if (!RegExpr.checkUserName(this.fromData.userName)) {
          toast("输入姓名包含特殊字符")
        } else if (this.fromData.phone == '') {
          toastFun('phone')
        } else if (!RegExpr.checkMobile(this.fromData.phone)) {
          toast("请输入正确的手机号码")
        } else if (this.fromData.area == '') {
          toastFun('area')
        } else if (this.fromData.address == '') {
          toastFun('address')
        } else {
          console.log("输入无误",this.fromData)
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
      ;
      (async () => {
        this.addressId = parseInt(this.$root.$mp.query.addressId);
        // console.log("地址id:",this.addressId)
        if (this.addressId) {
          let getUserAddressDetailRES = await getUserAddressDetail(this.getUserAddressDetailParams);
          if (getUserAddressDetailRES.errCode == 0) {
            let detail = getUserAddressDetailRES.detail;

            this.$set(this.fromData, 'userName', detail.name);
            this.$set(this.fromData, 'phone', detail.phone);
            this.$set(this.fromData, 'area', detail.region_name);
            this.$set(this.fromData, 'areaID', detail.region_id);
            this.$set(this.fromData, 'address', detail.address);
            this.$set(this.fromData, 'isdefault', detail.isdefault == 1 ? true : false);
        

            this.$set(this.initfromData, 'userName', this.fromData.userName);
            this.$set(this.initfromData, 'phone', this.fromData.phone);
            this.$set(this.initfromData, 'area', this.fromData.area);
            this.$set(this.initfromData, 'address', this.fromData.address);
            this.$refs['TableList'].resetInputItem();
          } else {
            toast(getUserAddressDetailRES.errMsg);
          }

        } else {
          this.$set(this.fromData, 'userName', "");
          this.$set(this.fromData, 'phone', "");
          this.$set(this.fromData, 'area', "");
          this.$set(this.fromData, 'areaID', "");
          this.$set(this.fromData, 'address', "");
          this.$set(this.fromData, 'isdefault', false);

          this.$set(this.initfromData, 'userName', "");
          this.$set(this.initfromData, 'phone', "")
          this.$set(this.initfromData, 'area', "")
          this.$set(this.initfromData, 'address', "")
          this.$refs['TableList'].resetInputItem();

          // this.$refs['TableList'].initInputItem(this.dataList);
        }
      })()
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