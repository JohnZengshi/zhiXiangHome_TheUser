<template>
  <div class="detial display_flex flex-direction_column">
    <ul>
      <li :key="index" v-for="(item,index) in dataList">
        <div class="item display_flex justify-content_flex-justify align-items_center">
          <div class="display_flex align-items_center">
            <span v-if="!item.noLine" class="line"></span>
            <span class="text">{{item.title}}</span>
          </div>
          <span v-if="item.model == 'text'" class="text">{{item.value}}</span>
          <InputItem 
            v-else-if="item.model == 'input'" 
            :item="item"
            @focus="currentEdit = item.key"
            @blur="textblur"></InputItem>
          <picker
            class="text"
            v-else-if="item.model == 'select'"
            mode="region"
            @change="bindRegionChange"
            @click="currentEdit = item.key"
            :value="region">
            <input 
                :value="item.value" 
                type="text" 
                :placeholder="item.placeholder"
                disabled>
            </picker>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import InputItem from "./inputItem";
  export default {
    data() {
      return {
          currentEdit: "",
          // inputValue: "",
          region: "",
      }
    },
    props: {
      dataList: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    components:{
      InputItem
    },
    methods:{
        // textInput(e){ //输入框输入
        //     this.inputValue = e.target.value;
        // },
        textblur(val) { //输入框完成输入
          this.$emit('textInput', val, this.currentEdit);
        },
        bindRegionChange(e){
            console.log(e)
            let val = e.target.value;
            this.$emit('textInput',val,this.currentEdit);
        }
    },
    mounted(){}
  }
</script>

<style lang="less" scoped>
  .detial {
    background-color: #fff;

    >.title {
      padding-left: 30rpx;
      width: 100%;
      height: 56rpx;
      line-height: 56rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(77, 61, 51, 1);
      background: rgba(241, 241, 241, 1);
    }

    >ul {
      li {
        height: 94rpx;
        padding: 0 30rpx;
        box-sizing: border-box;

        >.item {
          height: 100%;
          border-bottom: 1rpx solid rgba(241, 241, 241, 1);

          >div {
            .line {
              display: inline-block;
              width: 6rpx;
              height: 50rpx;
              margin-right: 16rpx;
              background: @baseColor;
            }
          }

          .text {
            font-size: 27rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(77, 61, 51, 1);
            text-align: right;
          }

          >.text {
            max-width: 470rpx;
          }
        }
      }
    }
  }
</style>