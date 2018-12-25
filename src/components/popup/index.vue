<template>
  <!-- 弹窗组件 -->
  <div class="popupComponent">
    <!-- 自定义 -->
    <div v-if="popType == '0'">
        <slot :name="customPopupData.slotName"></slot>
    </div>
    <!-- 确定 -->
    <div v-else-if="popType == '1'" class="success">
        
    </div>
    <!-- 删除 -->
    <div v-else-if="popType == '2'" class="del">
        
    </div>
    
    
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      popType: { //弹窗类型
        type: String,
        default: () => {
          return ""
        }
      },
      customPopupData: {
        type: Object,
        default: () => {
          return {
            slotName: "",
          }
        }
      },
      delPopupData: { //删除弹窗的传参
        type: Object,
        default: () => {
          return {
            title: "这是一个删除弹窗"
          }
        }
      }
    },
    methods: {
      
    },
    
  }
</script>
<style lang="less" scoped>
  .popupComponent {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(77, 61, 51, 0.5);
    z-index: 2;
   

    .del {
        width: 560rpx;
        height: 291rpx;
        background-color: #fff;
    }
  }
</style>