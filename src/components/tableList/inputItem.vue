<template>
    <input 
        class="text"
        @focus="focus" 
        @input="input"
        @blur="blur"
        :value="value"
        :type="inputType?inputType:'text'" 
        :placeholder="placeholder"
        :disabled="disabled"
        older-class="placeholderClass001">
</template>
<script>
  export default {
      props: {
        inputValue: {
          type: String,
        },
        inputType: { //输入框类型
          type: String,
          deafult: () => {
            return "text"
          }
        },
        placeholder: { //placeholder
          type: String,
          deafult: () => {
            return "请输入"
          }
        },
        disabled: {
          type: Boolean,
          deafult: () => {
            return false
          }
        }
      },
      data(){
          return {
              value:"",
          }
      },
      watch: {},
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
          this.value = this.inputValue;
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
