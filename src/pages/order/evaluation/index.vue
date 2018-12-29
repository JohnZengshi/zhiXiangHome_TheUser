<template>
  <div class="evaluationPage display_flex flex-direction_column">
    <span class="title">{{type == '4'?'评价':'追加评价'}}</span>
    <div class="gradedBox" v-show="type == '4'">
        <block
            v-for="(item,index) in gradedList"
            :key="index">
          <div 
            class="gradedItem display_flex align-items_center">
            <span class="title">{{item.title}}</span>
            <Graded
                :currentItem="item"
                :imgs="imgs" 
                :width="45" 
                :height="45" 
                :interval="27"
                :starValue="1" 
                :allScore="item.allScore"
                :initScroe="item.score"
                @ok="back"></Graded>
          </div>
        </block>
    </div>
    <div class="textArea">
      <textarea v-model.lazy="evaluationMsg" @blur.stop="textareaBlur" class="textAreaBox"></textarea>        
    </div>
    <div class="btn">
        <button @click="confirm" class="confirmBtn">提交</button>
    </div>
  </div>
</template>
<script>
  import {toast,navigateBack} from "@/utils/wxapi";
  import {assessWorkOrder,getWorkOrderAssessConfig} from "@/network/api";
  import Graded from "@/components/graded";
  export default {
    data() {
      return {
        order: "", //工单编号
        type: "", //评价类型
        evaluationMsg: "",
        imgs:["/static/images/components/star-gray-icon.png","","/static/images/components/star-glod-icon.png"],
        gradedConfig: [],
      }
    },
    components: {
      Graded
    },
    computed:{
      gradedList() {
        return this.gradedConfig.map((val) => {
          return {
            id: val.config_id,
            title: val.name,
            allScore: val.score,
            score: val.gradedScore,
          }
        })
      },
      assessWorkOrderParams() { //用户评价参数
        let gradedList = this.gradedConfig.map((val) => {
          return {
            config_id: val.config_id,
            score: val.gradedScore
          }
        })
        let option = {
          openid: this.globalData.openId,
          worder_sn: this.order,
          msg: this.evaluationMsg,
        }
        if (this.type == '4') {
          return Object.assign(option, {
            type: 1,
            score: JSON.stringify(gradedList),
          })
        } else if (this.type == '7') {
          return Object.assign(option, {
            type: 2,
          })
        } else{
          return {}
        }
      }
    },
    methods: {
      back(item,score) {
        this.gradedConfig.forEach((val,index)=>{
          if(val.config_id == item.id){
            val.gradedScore = score;
          }
        })
      },
      textareaBlur(e) {
        this.evaluationMsg = e.target.value;
      },
      confirm() {
        setTimeout(async () => { //调试工具点击有延迟延迟
          console.log(this.evaluationMsg);
          if (this.type == '7') {
            if (this.evaluationMsg == '') {
              toast("追加评价不能为空", 500);
              return;
            }
          }
          let assessWorkOrderRES = await assessWorkOrder(this.assessWorkOrderParams);
          if (assessWorkOrderRES.errCode == 0) {;
            (async () => {
              let res = await toast(assessWorkOrderRES.msg, 500);
              if (res) {
                this.reset();
                navigateBack();
              }
            })()
          } else {
            toast(assessWorkOrderRES.errMsg)
          }
        }, 100)
      },
      getWorkOrderAssessConfig() { //获取工单评价评分配置
        ;(async()=>{
          let getWorkOrderAssessConfigRES = await getWorkOrderAssessConfig({openid:this.globalData.openId});
          if(getWorkOrderAssessConfigRES.errCode == 0){
            let gradedConfig = getWorkOrderAssessConfigRES.config;
            gradedConfig.forEach((val)=>{
              Object.assign(val,{gradedScore:0})
            });
            this.gradedConfig = gradedConfig;
            console.log(this.gradedConfig)
          }else{
            toast(getWorkOrderAssessConfigRES.errMsg)
          }
        })()
      },
      reset(){ //重置
        this.evaluationMsg = "";
        this.gradedConfig = [];
      }
    },
    onLoad(option){},
    mouted(){
      this.order = this.$root.$mp.query.order;
      this.type = `${this.$root.$mp.query.type}`;
      ;(async()=>{
        await this.getWorkOrderAssessConfig();
      })()
    },
    onShow(){
      this.order = this.$root.$mp.query.order;
      this.type = `${this.$root.$mp.query.type}`;
      ;(async()=>{
        await this.getWorkOrderAssessConfig();
      })()
    },
    onUnload(){
      this.reset();
    }
  }
</script>

<style lang="less" scoped>
  .evaluationPage {
    >.title {
      padding: 0 30rpx;
      width: 750rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: rgba(241, 241, 241, 1);
      font-size: 24rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(77, 61, 51, 1);
    }
    .gradedBox{
        padding: 0 30rpx;
        .gradedItem{
            height: 98rpx;
            border-bottom: 1rpx solid #D8D8D8;
            >.title{
                font-size:32rpx;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(77,61,51,1);
                margin-right: 26rpx;
            }
        }
    }
    .textArea{
        padding: 0 30rpx;
        margin-top: 37rpx;
        box-sizing: border-box;
        .textAreaBox{
            padding: 30rpx 38rpx 30rpx 38rpx;
            box-sizing: border-box;
            width:690rpx;
            height:386rpx;
            border-radius:10rpx;
            border:1rpx solid rgba(197,197,199,1);
            font-size:27rpx;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(77,61,51,1);
        }
    }
    >.btn {
      position: fixed;
      bottom: 53rpx;
      width: 100%;

      >button {
        width: 670rpx;
      }
    }
  }
</style>