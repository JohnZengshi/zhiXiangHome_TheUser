<template>
  <!-- 头部tabs栏切换组件 -->
  <div class="tabsComponent">
    <scroll-view
      class="scrollView"
      scroll-x
      :scroll-into-view="toView">
      <ul
        :style="{width: itemWidth*tabsList.length+'rpx'}" >
        <li 
        :id="'_'+index"
        :style="{width: itemWidth+'rpx'}" 
        class="item" :key="index" 
        v-for="(item,index) in tabsList" 
        @click="switchTab(index)">{{item.text}}</li>
        <span 
          :style="{width: itemWidth+'rpx', left: itemLeft + 'rpx'}" 
          class="line"></span>
      </ul>
    </scroll-view>
    
  </div>
</template>
<script>
  import {createSelectorQuery_fields} from "@/utils/wxapi";
  export default {
    name: "tabs",
    props: {
      tabsList: {
        type: Array,
        default: () => {
          return []
        }
      },
      itemWidth: {
        type: String,
        default: () => {
          return ""
        }
      }
    },
    data() {
      return {
        itemLeft: "0",
        toView: "",
      }
    },
    methods: {
      switchTab(index) {
        ;
        (async () => {
          this.itemLeft = `${index*this.itemWidth}`;
          console.log(this.itemLeft)
          this.$emit("switchTab",index);
          // let res = await createSelectorQuery_fields(".line");
          // console.log(res);
          if(this.itemLeft > 300){
            this.toView = '_1'
          }else if(this.itemLeft <= 300){
            this.toView = '_0'
          }
        })()
      }
    },
    mounted(){
      // ;(async()=>{
      //   let res = await createSelectorQuery_fields(".line");
      //   console.log(res);
      // })()
    }

  }
</script>
<style lang="less" scoped>
  .tabsComponent {
    position: absolute;
    top: 0;
    background-color: #fff;
    z-index: 1;
    width: 100%;
    // overflow-x: scroll;
    .scrollView {
      width: 100%;
      position: relative;
      ul {
        height: 94rpx;
        white-space: nowrap;
        position: relative;
        li {
          float: left;
          height: 100%;
          line-height: 94rpx;
          text-align: center;
          font-size: 28rpx;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(77, 61, 51, 1);
        }
        >.line {
          position: absolute;
          bottom: 0;
          display: inline-block;
          transition: all 0.2s;
          height: 5rpx;
          background: @baseColor;
        }
        
      }
      
    }
    
  }

</style>
