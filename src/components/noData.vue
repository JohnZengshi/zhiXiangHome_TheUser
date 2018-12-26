<template>
  <!-- 暂无数据组件 -->
  <div class="nodataComponent display_flex justify-content_flex-center align-items_center">
    <span>{{text}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: () => {
          return "暂无数据"
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .nodataComponent {
    width: 100%;
    height: 100%;

    >span {
      font-size: 32rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(197, 197, 199, 1);
    }
  }
</style>