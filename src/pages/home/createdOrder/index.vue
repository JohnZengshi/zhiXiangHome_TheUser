<template>
  <div class="createdOrderPage display_flex flex-direction_column align-items_center">
    <TableList
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
                    <textarea class="textarea"></textarea>
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
                        <li>
                            <div class="uploadBtn display_flex justify-content_flex-center align-items_center">
                                <img src="/static/images/components/add-pic-icon.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </TableList>
    </div>
    <button class="confirmBtn">提交</button>
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
    setNavigationBarTitle
  } from "@/utils/wxapi";

  import TableList from "@/components/tableList";
  import InputItem from "@/components/tableList/inputItem";
  import Popup from "@/components/popup";
  import CustomSelect from "@/components/common/select";
  export default {
    components: {
      TableList,
      InputItem,
      Popup,
      CustomSelect
    },
    data(){
        return {
            fromData:{ //表单数据
                userName: "",
                phone: "",
                classification: "",
                doorTime: ['',''],
                serviceAddress: "",
                detailedAddress: "这里根据默认地址获取",
                uploadImgList:["http://img0.imgtn.bdimg.com/it/u=1337376271,3140793675&fm=26&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=1277810071,350146296&fm=26&gp=0.jpg","http://img0.imgtn.bdimg.com/it/u=1337376271,3140793675&fm=26&gp=0.jpg","http://img0.imgtn.bdimg.com/it/u=1337376271,3140793675&fm=26&gp=0.jpg"],
            },
            showPopup: false,
            customPopupData: {
                slotName: "select"
            },
            selectPopupData: {
                title: "请选择设备分类", //弹窗标题
                key: "key", //选中的key值
                label: "value", //显示的值
                selectList: [{ //选中列表
                    key: "123",
                    value: "哈哈哈",
                    noSelectIcon: true,
                    imgUrl: "http://img0.imgtn.bdimg.com/it/u=1337376271,3140793675&fm=26&gp=0.jpg",
                },{ 
                    key: "666",
                    value: "777",
                    noSelectIcon: true,
                    imgUrl: "http://img1.imgtn.bdimg.com/it/u=1277810071,350146296&fm=26&gp=0.jpg",
                }] 
            },
            isShowDetail: false,
        }
    },
    computed: {
        dataList(){
            return [{
                title: "业主姓名",
                model: "input",
                placeholder: "请输入姓名",
                key: "userName",
                required: true,
                value: this.fromData.userName
            },{
                title: "联系电话",
                model: "input",
                inputType: "number",
                placeholder: "请输入联系电话",
                key: "phone",
                required: true,
                value: this.fromData.phone
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
                model: "text",
                key: "detailedAddress",
                noLine: true,
                value: this.fromData.detailedAddress
            }]
        },
        detailDataList(){
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
        }
    },
    methods:{
        textblur(val,key){
            console.log(val,key)
            if(key == 'doorTime'){
                if(val.includes("-")){
                    this.fromData[key].splice(0,1,val)
                }else if(val.includes(":")){
                    this.fromData[key].splice(1,1,val)
                }
            }else{
                this.fromData[key] = val;
            }
        },
        selectClassification(){ //选择设备类型
            console.log("选择设备类型");
            this.showPopup = true;
        },
        selectItem(item){ //点击某一项触发
            console.log(item);
            this.fromData.classification = item.value;
            this.showPopup = false;
        },
        showDetail(){
            this.isShowDetail = !this.isShowDetail;
        }
    },
    onLoad(option) {
      console.log(option);
      let type = option.type;
      if (type == '1') {
        setNavigationBarTitle("我要维修");
      }
    }
  }
</script>
<style lang="less" scoped>
.createdOrderPage {
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
    >.textarea{
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
          >img{
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
    margin-top: 39rpx;
    margin-bottom: 29rpx;
    >span{
        font-size:27rpx;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(197,197,199,1);
        margin-right: 18rpx;
    }
    >img{
        width: 20rpx;
        height: 20rpx;
    }
  }
  .confirmBtn {
    width: 670rpx;
    //   margin-top: 362rpx;
    position: fixed;
    bottom: 54rpx;
  }
}
</style>