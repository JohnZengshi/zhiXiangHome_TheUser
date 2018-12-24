<template>
  <!-- 选择组件 -->
  <div class="selectComponent">

    <div class="item display_flex align-items_center">
      <div class="icon" @click="selectClick">
        <img v-if="!isSelect" class="unSelect" src="/static/images/components/unSelect.png" alt="">
        <img v-else class="select" src="/static/images/components/select.png" alt="">
      </div>
      <div class="label">
        <span>{{text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      model: { //模式
        type: String,
        default: () => {
          return "radio"
        }
      },
      text: { //显示的文字
        type: String,
        default: () => {
          return ""
        }
      },
      defaultSelect: { //默认选中
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    data() {
      return {
        isSelect: false
      }
    },
    methods: {
      selectClick() {
        if (this.model == 'oneSelect') {
          this.isSelect = !this.isSelect
          this.$emit("selectBack", this.isSelect)
        }
      }
    },
    mounted(){
      this.isSelect = this.defaultSelect;
    }
  }
</script>
<style lang="less" scoped>
  .selectComponent {
    height: 50rpx;

    .item {
      .icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 16rpx;

        >img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>