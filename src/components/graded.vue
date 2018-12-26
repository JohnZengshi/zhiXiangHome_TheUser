<template>
    <!-- 评分组件 -->
  <div class="container">
    <div class="display_flex justify-content_flex-center align-items_center" v-for="(star,index) in stars" :key="index" style="position: relative">
      <img 
      :src="star.img" 
      :style="{'width':(width + 'rpx'),'height':(height + 'rpx'),'margin-right':(interval + 'rpx')}">
      <div v-if="isClick" class="all" @click="scoreBtn(0,index)"></div>
      <!-- <div v-if="isClick" class="left" @click="scoreBtn(1,index)"></div> -->
      <!-- <div v-if="isClick" class="right" @click="scoreBtn(2,index)"></div> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      imgs: {
        type: Array,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      interval: {
        type: Number,
      },
      starValue: {
        type: Number,
      },
      isClick: { //是否可点击
        type: Boolean,
        default: () => {
          return true
        }
      },
      initScroe: { //初始化分数
        type: Number,
      }
    },
    // 属性          类型        单位          说明
    // imgs         Array        无          imgs为三种状态图片url的数组（注意：数组的顺序为 空心图片url》 半实心图片url 》 实心图片url）
    // width        number       px            星星的宽度
    // height       number       px            星星图片的高度
    // starValue    number       无            每个星星代表分值
    // ok           method       无             打分后的回调，返回一个分值
    data() {
      return {
        stars: []
      }
    },
    mounted() {
      let starNum = this.initScroe / this.starValue; //初始化
      this.stars = [{
          img: this.imgs[0]
        },
        {
          img: this.imgs[0]
        },
        {
          img: this.imgs[0]
        },
        {
          img: this.imgs[0]
        },
        {
          img: this.imgs[0]
        }
      ];
      this.stars.forEach((val, index) => {
        if (index < starNum) {
          val.img = this.imgs[2]
        }
      })
    },
    methods: {
      scoreBtn(type, index) { //点击图片时触发
        let starNum = index + 1;
        this.stars.forEach((val, i) => {
          if (i < starNum) {
            val.img = this.imgs[2]
          } else {
            val.img = this.imgs[0]
          }
        })
        // let score = type === 1 ? (this.starValue / 2) : this.starValue;
        // this.stars[index].img = type === 1 ? this.imgs[1] : this.imgs[2];
        // this.stars.forEach((val, ind) => {
        //   if (ind < index) {
        //     score += this.starValue;
        //     val.img = this.imgs[2];
        //   } else if (ind > index) {
        //     val.img = this.imgs[0];
        //   }
        // });
        this.$emit("ok", starNum)
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row
  }
  .all{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0; 
  }
  .right {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 50%; 
  }

  .left {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>