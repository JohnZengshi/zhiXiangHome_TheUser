<template>
  <div class="detial display_flex flex-direction_column">
    <ul>
      <li :key="index" v-for="(item,index) in dataList">
        <div 
          :class="{
            'flex-direction_column':flexDirection == 'column',
            'align-items_center':alignItemsCenter,
            'noBottomLine': noBottomLine}"
          class="item display_flex justify-content_flex-justify">
          <div class="label display_flex align-items_center">
            <span v-if="!item.noLine" class="line"></span>
            <span class="text">{{item.title}}</span>
            <span v-if="item.required" class="requiredIcon">*</span>
          </div>
          <!-- 文本形式 -->
          <block v-if="item.model == 'text'">
            <span class="text">{{item.value}}</span>
          </block>
          <!-- 输入框形式 -->
          <block v-else-if="item.model == 'input'" >
            <InputItem 
              ref="InputItem"
              :initValue="item.initValue"
              :inputType="item.inputType"
              :placeholder="item.placeholder"
              :_initDataFun="initDataFun"
              @focus="currentEdit = item.key"
              @blur="textblur"></InputItem>
          </block>
          <!-- 微信官方的选择形式 -->
          <block v-else-if="item.model == 'select'">
            <picker
              class="text"
              :mode="item.selectMode"
              @change="bindRegionChange"
              @click="currentEdit = item.key"
              >
              <div class="pickerBox display_flex align-items_center">
                <input 
                  :value="item.value" 
                  type="text" 
                  :placeholder="item.placeholder"
                  disabled>
                <img class="arrows" src="/static/images/mainPage/arrows.png" alt="">
              </div>
            </picker>
          </block>
          <!-- 微信官方多选择模式 -->
          <block v-else-if="item.model == 'multiSelector'">
              <div class="text multiSelector display_flex">
                <picker
                  v-for="(v,i) in item.multiList"
                  :key="i"
                  :mode="v.selectMode"
                  @change="bindRegionChange"
                  @click="currentEdit = item.key">
                  <div class="pickerBox display_flex align-items_center">
                    <input 
                      :value="v.value" 
                      type="text" 
                      :placeholder="v.placeholder"
                      disabled>
                    <img class="arrows" src="/static/images/mainPage/arrows.png" alt="">
                  </div>
                </picker>
              </div>
          </block>
          <!-- 自定义操作 -->
          <block v-else-if="item.model == 'customOperation'">
              <slot :name="item.slotName"></slot>
          </block>
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
      }
    },
    props: {
      dataList: {
        type: Array,
        default: () => {
          return []
        }
      },
      flexDirection: { //flex布局方向
        type: String,
        default: () => {
          return "row"
        }
      },
      alignItemsCenter: { //丛向布局
        type: Boolean,
        default: () => {
          return true
        }
      },
      noBottomLine: { //取消底部线条
        type: Boolean,
        default: () => {
          return false
        }
      },
      initDataFun: {
        type: Function,
      }
    },
    components:{
      InputItem
    },
    computed:{},
    methods: {
      textblur(val) { //输入框完成输入
        this.$emit('textblur', val, this.currentEdit);
      },
      bindRegionChange(e) {
        let val = e.target.value;
        this.$emit('textblur', val, this.currentEdit);
      },
    },
    mounted() {},
    onShow() {},
  }
</script>

<style lang="less" scoped>
  .detial {
    width: 100%;
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
        // height: 94rpx;
        padding: 0 30rpx;
        box-sizing: border-box;

        >.item {
          padding: 22rpx 0;
          height: 100%;
          border-bottom: 1rpx solid rgba(241, 241, 241, 1);
          &.noBottomLine{
            border-bottom: none;
          }
          >.label {
            .line {
              display: inline-block;
              width: 6rpx;
              height: 50rpx;
              margin-right: 16rpx;
              background: @baseColor;
            }
            .text {
              font-size: 27rpx;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(77, 61, 51, 1);
              text-align: right;
            }
            .requiredIcon{
              margin-left: 6rpx;
              font-size:27rpx;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(239,92,92,1);
            }
          }

          >.text {
            font-size: 27rpx;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(77, 61, 51, 1);
            max-width: 470rpx;
            text-align: right;
            .pickerBox {
              .arrows {
                width: 13rpx;
                height: 23rpx;
                margin-left: 27rpx;
              }
            }
          }
        }
      }
    }
  }
</style>