<template>
  <div class="evaluationPage display_flex flex-direction_column">
    <span class="title">评价</span>
    <div class="gradedBox">
        <block
            v-for="(item,index) in gradedList"
            :key="index">
          <div class="gradedItem display_flex align-items_center">
            <span class="title">{{item.title}}</span>
            <Graded
                :imgs="imgs" 
                :width="45" 
                :height="45" 
                :interval="27"
                :starValue="1" 
                :initScroe="item.score"
                @ok="back"></Graded>
          </div>
        </block>
    </div>
    <div class="textArea">
        <textarea class="textAreaBox"></textarea>
    </div>
    <div class="btn">
        <button class="confirmBtn">提交</button>
    </div>
  </div>
</template>
<script>
  import Graded from "@/components/graded";
  export default {
    data() {
      return {
        imgs:["/static/images/components/star-gray-icon.png","","/static/images/components/star-glod-icon.png"],
        gradedList: [{
            title: "服务态度：",
            score: 0
        },{
            title: "专业技能：",
            score: 0
        }],
      }
    },
    components: {
      Graded
    },
    methods: {
      back(score) {
        console.log(score)
      }
    },
    onLoad(option){

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