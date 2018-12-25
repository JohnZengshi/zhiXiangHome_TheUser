<template>
    <input 
        class="text"
        @focus="focus" 
        @input="input"
        @blur="blur"
        :value="value"
        :type="item.type?item.type:'text'" 
        :placeholder="item.placeholder"
        older-class="placeholderClass001">
</template>
<script>
  export default {
      props:{
          item:{
              type: Object,
          },
      },
      data(){
          return {
              value:"",
          }
      },
      methods: {
        focus() {
          this.$emit('focus')
        },
        input(e) {
          this.value = e.target.value;
        },
        blur() {
          this.$emit('blur',this.value)
        }
      },
      mounted(){
          this.value = this.item.value;
      }
  }
</script>

<style lang="less"scoped>
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

</style>
