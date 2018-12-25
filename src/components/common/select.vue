<template>
    <div class="selectCommon">
        <span class="title">{{selectPopupData.title}}</span>
        <ul>
            <li 
            class="display_flex align-items_center"
            :key="index"
            v-for="(item,index) in selectPopupData.selectList"
            @click="selectItem(item)">
                <block v-if="!item.noSelectIcon">
                  <img class="selectIcon" v-if="item[selectPopupData.key] == currentId" src="/static/images/components/select.png" alt="">
                  <img class="selectIcon" v-else src="/static/images/components/unSelect.png" alt="">
                </block>
                <block v-else-if="item.imgUrl && item.imgUrl !== ''">
                  <img class="pic" :src="item.imgUrl">
                </block>
                <span>{{item[selectPopupData.label]}}</span>
            </li>
        </ul>
        <div class="btn display_flex">
            <button  @click.stop="cancel">取消</button>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      selectPopupData: { //选择弹窗的传参
        type: Object,
        default: () => {
          return {
            title: "这是一个选择弹窗", //弹窗标题
            key: "a", //选中的key值
            label: "b", //显示的值
            selectList: [{ //选中列表
              a: "",
              b: "",
              noSelectIcon: false, //是否隐藏选择icon
              imgUrl: '', //拥有图片
            }]
          }
        }
      },
    },
    data() {
      return {
        currentId: ""
      }
    },
    methods: {
      selectItem(item) { //选择某一项
        this.currentId = item[this.selectPopupData.key];
        this.$emit('selectItem',item)
      },
      cancel() {
        console.log("隐藏")
        this.$emit("cancel")
      },
      confirm() {
        let item = this.selectPopupData.selectList.find((val) => {
          return val[this.selectPopupData.key] == this.currentId
        });
        this.$emit("confirm", item)
      }
    },
    mounted() {
      this.currentId = this.selectPopupData.selectList[0][this.selectPopupData.key]; //初始化
    }
  }
</script>

<style lang="less"scoped>
.selectCommon {
  width: 100%;
  background-color: #fff;
  position: absolute;
  bottom: 0;

  >.title {
    display: inline-block;
    width: 100%;
    height: 92rpx;
    background: rgba(240, 240, 240, 1);
    font-size: 32rpx;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(77, 61, 51, 1);
    line-height: 92rpx;
  }

  >ul {
    li {
      width: 100%;
      // height: 89rpx;

      .selectIcon {
        width: 46rpx;
        height: 46rpx;
        margin:20rpx 30rpx;
      }
      .pic{
        width: 92rpx;
        height: 92rpx;
        margin: 9rpx 30rpx;
      }

      span {
        font-size: 34rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(77, 61, 51, 1);
      }
    }
  }

  >.btn {
    height: 100rpx;

    >button {
      height: 100%;
      width: 100%;
      font-size: 36rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(77, 61, 51, 1);
    }
  }
}

</style>
