<template>
  <div class="addressDetailPage">
    <TableList 
        :dataList="dataList"
        @textblur="textblur"></TableList>
  </div>
</template>
<script>
  import TableList from "@/components/tableList";
  export default {
    data() {
      return {
        moniData: {
            userName:"老治安",
            phone: "1234567890",
            area: "广东深圳",
            address: "德赛大厦"
        }
      }
    },
    components: {
      TableList,
    },
    computed: {
      dataList() {
        return [{
          key: "userName",
          title: "姓名",
          value: this.moniData.userName,
          placeholder: "请输入姓名",
          model: "input",
        }, {
          key: "phone",
          title: "联系电话",
          value: this.moniData.phone,
          placeholder: "请输入联系电话",
          type: "number",
          model: "input",
        }, {
          key: "area",
          title: "所在地区",
          value: this.moniData.area,
          placeholder: "请选择地址",
          model: "select",
          selectMode: "region" //选择城市
        }, {
          key: "address",
          title: "详细地址：",
          value: this.moniData.address,
          placeholder: "请输入详细地址",
          model: "input",
        }, ]
      }
    },
    methods: {
      textblur(val,key){
          let item = this.dataList.find((v)=>{
              return v.key == key
          });
          if(key == 'area'){
              this.moniData[item.key] =  val.join("");
          }else{
              this.moniData[item.key] =  val
          }
      }
    }
  }
</script>

<style lang="less" scoped>
  .addressDetailPage {}
</style>