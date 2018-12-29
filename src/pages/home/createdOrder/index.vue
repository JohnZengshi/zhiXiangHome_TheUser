<template>
  <div class="createdOrderPage">
    <TableList
        ref="TableList"
        :dataList="dataList"
        @textblur="textblur">
        <!-- 设备分类slot --> 
        <div slot="classificationSelect">
            <div 
                @click="selectClassification" 
                class="classificationSelect display_flex align-items_center">
                    <input 
                        :value="classificationData.value" 
                        :type="classificationData.inputType" 
                        :placeholder="classificationData.placeholder"
                        disabled>
                    <img class="arrows" src="/static/images/mainPage/arrows.png" alt="">
            </div>
        </div>
    </TableList>
    <div 
        @click="showDetail"
        class="detail display_flex align-items_center justify-content_flex-center">
            <span>详情</span>
            <img v-if="!isShowDetail" src="/static/images/components/arrow-dowm-icon.png" alt="">
            <img v-else-if="isShowDetail" src="/static/images/components/arrow-up-icon.png" alt="">
    </div>
    <div v-show="isShowDetail">
      <TableList
        :dataList="detailDataList"
        flexDirection="column"
        :alignItemsCenter="false"
        :noBottomLine="true">
            <!-- 维修说明slot -->
            <div slot="maintenanceInstructions">
                <div class="maintenanceInstructions">
                    <textarea
                        @blur="textareablur" 
                        class="textarea"></textarea>
                </div>
            </div>
            <!-- 上传图片slot -->
            <div slot="uploadPictures">
                <div class="uploadPictures">
                    <ul>
                        <li 
                            v-for="(item,index) in fromData.uploadImgList"
                            :key="index">
                            <img :src="item" alt="">
                        </li>
                        <li v-if="fromData.uploadImgList.length < 3">
                            <div 
                                @click="upLoadImage"
                                class="uploadBtn display_flex justify-content_flex-center align-items_center">
                                <img src="/static/images/components/add-pic-icon.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </TableList>
    </div>
    <div class="btn">
        <button @click="confirmBtn" class="confirmBtn">提交</button>
    </div>
    <Popup 
        v-if="showPopup"
        popType="0" 
        :customPopupData="customPopupData">
        <div slot="select">
            <CustomSelect 
                :selectPopupData="selectPopupData"
                @selectItem="selectItem"
                @cancel="showPopup = false"></CustomSelect>
        </div>
    </Popup>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
  import {
    postWorkOrder,
    getWorkOrderGoodsList,
    getOneRegions,
  } from "@/network/api";
  import {
    toast,
    setNavigationBarTitle,
    chooseImage,
    uploadFile,
    switchTab
  } from "@/utils/wxapi";
  import {
    publicParams
  } from "@/network/config/publicParams";
  import {
    API_URL,
  } from '@/network/config/hostConfig';
  import {
    sign as getSign
  } from "@/utils/signEncryption";
  import {RegExpr} from "@/utils/regex";
  import TableList from "@/components/tableList";
  import Popup from "@/components/popup";
  import CustomSelect from "@/components/common/select";
  export default {
    components: {
      TableList,
      Popup,
      CustomSelect
    },
    data(){
        return {
            createdOrderType: "", //创建工单类型
            fromData:{ //表单数据
                userName: "",
                phone: "",
                classification: "",
                doorTime: ['',''],
                serviceAddress: [],
                detailedAddress: "",
                maintenanceInstructions: "",
                uploadImgList:[],
            },
            initFromData: {
                userName: "",
                phone: "",
                detailedAddress: "",
            },
            showPopup: false, //是否显示弹窗
            customPopupData: { //自定义弹窗参数
                slotName: "select"
            },
            
            isShowDetail: false, //显示详情
            currentUploadImg: "", //当前上传的图片
            workOrderGoodsList: [], //可维修产品列表
            selectGood: {},
            selectRegion_id: "",
        }
    },
    computed: {
        ...mapState({
          cityList: state => state.regions.list //城市列表
        }),
        dataList(){ //必填数据
            return [{
                title: "业主姓名",
                model: "input",
                placeholder: "请输入姓名",
                key: "userName",
                required: true,
                value: this.fromData.userName,
                initValue: this.initFromData.userName
            },{
                title: "联系电话",
                model: "input",
                inputType: "number",
                placeholder: "请输入联系电话",
                key: "phone",
                required: true,
                value: this.fromData.phone,
                initValue: this.initFromData.phone
            },{
                title: "设备分类",
                model: "customOperation",
                slotName: "classificationSelect",
                placeholder: "请选择设备类型",
                key: "classification",
                required: true,
                value: this.fromData.classification
            },{
                title: "上门时间",
                model: "multiSelector",
                multiList: [{
                    selectMode: "date",
                    placeholder: "请选择上门日期",
                    value: this.fromData.doorTime[0],
                },{
                    selectMode: "time",
                    placeholder: "请选择上门时间",
                    value: this.fromData.doorTime[1],
                }],
                key: "doorTime",
                required: true,
            },{
                title: "服务地址",
                model: "select",
                selectMode: "region",
                placeholder: "请选择服务地址",
                key: "serviceAddress",
                required: true,
                value: this.fromData.serviceAddress
            },{
                title: "详细地址：",
                model: "input",
                key: "detailedAddress",
                placeholder: "请输入详细地址",
                noLine: false,
                value: this.fromData.detailedAddress,
                initValue: this.initFromData.detailedAddress,
                required: true,
            }]
        },
        detailDataList(){ //详情数据
            return [{
              title: "维修说明（非必填）",
              model: "customOperation",
              slotName: "maintenanceInstructions",
            },{
              title: "上传图片（非必填，最多3张）",
              model: "customOperation",
              slotName: "uploadPictures",
            }]
        },
        classificationData() { //设备分类数据
          return this.dataList.find((val) => {
            return val.key == 'classification'
          })
        },
        selectPopupData() { //选择弹窗参数
          let selectList = this.workOrderGoodsList.map((val) => {
            return { //选中列表
              goods_id: val.goods_id,
              name: val.name,
              noSelectIcon: true,
              imgUrl: val.thumb,
            }
          })
          return {
            title: "请选择设备分类", //弹窗标题
            key: "goods_id", //选中的key值
            label: "name", //显示的值
            selectList: selectList
          }
        },
        postWorkOrderParams() { //用户提交维修工单参数
            return {
                openid:this.globalData.openId,
                goods_id:this.selectGood.goods_id,
                user_name:this.fromData.userName,
                phone: this.fromData.phone,
                region_id: this.selectRegion_id,
                region_name: this.fromData.serviceAddress.join(" "),
                address: this.fromData.detailedAddress,
                appointment: this.fromData.doorTime.join(" "),
                fault_desc: this.fromData.maintenanceInstructions,
                images: this.fromData.uploadImgList.join(",")
            }
        },
        uploadImageParams() { //图片上传参数
          let params = {
            openid: this.globalData.openId,
            method: 'uploadImage',
            type: "idcard",
            ...publicParams,
          };
          params.sign = getSign(params);
          return {
            // openid: this.globalData.openId,
            // file: this.currentUploadImg,
            url: API_URL,
            filePath: this.currentUploadImg,
            name: "file",
            formData: params,
          }
        },
        
      },
    methods:{
        textblur(val,key){
            console.log(val,key)
            if (typeof (val) != "undefined") {
              if (key == 'doorTime') {
                if (val.includes("-")) {
                  this.fromData[key].splice(0, 1, val)
                } else if (val.includes(":")) {
                  this.fromData[key].splice(1, 1, val)
                }
              } else if (key == 'serviceAddress') {
                  ;
                  (async () => {
                    let region_id = await this.getFinalRegions(val);
                    this.selectRegion_id = region_id;
                  })()
                  this.fromData[key] = val;
              } else {
                this.fromData[key] = val;
              }
            }
        },
        selectClassification(){ //选择设备类型
            console.log("选择设备类型");
            this.showPopup = true;
        },
        selectItem(item){ //点击某一项触发
            console.log(item);
            this.fromData.classification = item.name;
            this.selectGood = item;
            this.showPopup = false;
        },
        showDetail(){ //显示详情
            this.isShowDetail = !this.isShowDetail;
        },
        textareablur(e){ //输入域失去焦点时触发
            this.fromData.maintenanceInstructions = e.target.value
        },
        upLoadImage(){ //上传图片
            ;(async () => {
              let chooseImageRES = await chooseImage(1, ['album', 'camera']);
              this.currentUploadImg = chooseImageRES.tempFilePaths[0];
              let uploadFileRES = await uploadFile(this.uploadImageParams);
              if (uploadFileRES.errCode == 0) { //上传成功
                this.fromData.uploadImgList.push(uploadFileRES.file.file)
              } else {
                toast(uploadFileRES.errMsg)
              }
            })()
        },
        confirmBtn() { //提交
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
          } else if (this.fromData.classification == '') {
            toastFun('classification')
          } else if (this.fromData.doorTime[0] == '') {
            toast("请选择上门日期")
          } else if (this.fromData.doorTime[1] == '') {
            toast("请选择上门时间")
          } else if (this.fromData.serviceAddress == '') {
            toastFun('serviceAddress')
          } else if (this.fromData.detailedAddress == '') {
            toastFun('detailedAddress')
          }
          else {
            console.log("输入无误", this.postWorkOrderParams);
            (async () => {
              let postWorkOrderRES = await postWorkOrder(this.postWorkOrderParams)
              console.log(postWorkOrderRES)
              if (postWorkOrderRES.errCode == 0) {
                let res = await toast(postWorkOrderRES.msg, 500)
                if (res) {
                  this.resetFrom();
                  switchTab("/pages/order/main");
                }
              }else{
                  toast(postWorkOrderRES.errMsg)
              }
            })()
          }
        },
        getFinalRegions(valList) { //获取regions_id
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
        resetFrom(){ //重置表单
          this.$set(this.fromData,"classification","");
          this.$set(this.fromData,"doorTime",['','']);
          this.$set(this.fromData,"serviceAddress",[]);
          this.$set(this.fromData,"maintenanceInstructions","");
          this.$set(this.fromData,"uploadImgList",[]);
          this.$refs['TableList'].resetInputItem();
        }
    },
    onLoad(option) {
      console.log(option);
      let type = option.type;
      this.createdOrderType = type;
      if (type == '1') { //维修
        ;(async()=>{
            let getWorkOrderGoodsListRES =await getWorkOrderGoodsList();
            if(getWorkOrderGoodsListRES.errCode == 0){
                this.workOrderGoodsList = getWorkOrderGoodsListRES.list
            }else{
                toast(getWorkOrderGoodsListRES.errMsg)
            }
        })()
        // this.$set(this.fromData, "detailedAddress", "这里根据默认地址获取")
        setNavigationBarTitle("我要维修");
      }else if(type == '2'){ //安装
        setNavigationBarTitle("我要安装");
      }
    },
    onShow() {
      
    }
  }
</script>
<style lang="less" scoped>
.createdOrderPage {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-ing: touch;

  .classificationSelect {
    font-size: 27rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(77, 61, 51, 1);
    max-width: 470rpx;
    text-align: right;

    .arrows {
      width: 13rpx;
      height: 23rpx;
      margin-left: 27rpx;
    }


  }

  .maintenanceInstructions {
    box-sizing: border-box;
    margin-top: 22rpx;

    >.textarea {
      padding: 30rpx 38rpx 30rpx 38rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      border: 1rpx solid rgba(197, 197, 199, 1);
      font-size: 27rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(77, 61, 51, 1);
      width: 690rpx;
      height: 196rpx;
      border: 1rpx solid rgba(222, 222, 222, 1);
    }

  }

  .uploadPictures {
    margin-top: 29rpx;
    margin-bottom: 242rpx;

    ul {
      li {
        width: 196rpx;
        height: 196rpx;
        float: left;
        margin-right: 30rpx;
        margin-bottom: 30rpx;

        img {
          width: 100%;
          height: 100%;
        }

        .uploadBtn {
          width: 100%;
          height: 100%;
          background: rgba(244, 244, 244, 1);

          >img {
            width: 50rpx;
            height: 50rpx;
          }
        }
      }
    }
  }

  .detail {
    width: 184rpx;
    height: 54rpx;
    border-radius: 27rpx;
    border: 1rpx solid rgba(197, 197, 199, 1);
    margin: 39rpx auto 29rpx;

    >span {
      font-size: 27rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(197, 197, 199, 1);
      margin-right: 18rpx;
    }

    >img {
      width: 20rpx;
      height: 20rpx;
    }
  }

  .btn {
    position: fixed;
    bottom: 54rpx;
    width: 100%;
    .confirmBtn {
      width: 670rpx;
    }
  }
}
</style>