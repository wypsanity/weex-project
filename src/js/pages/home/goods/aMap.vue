<template>
<div>
  <top-bar right-text="确定" @callRight="commitAddress"></top-bar>
  <select-amap class="map" ref="map2017" :center="pos" scale="true" geolocation="true" @finish='finish'></select-amap>
  <div class="bottom-layout">
    <div :class="['commom-sty',changeBg==1 ? 'changeBgClass' : '']" @click="select(1)"><text>住宅区</text></div>
    <div :class="['commom-sty',changeBg==2 ? 'changeBgClass' : '']" @click="select(2)"><text>学校</text></div>
    <div :class="['commom-sty',changeBg==3 ? 'changeBgClass' : '']" @click="select(3)"><text>楼宇</text></div>
    <div :class="['commom-sty',changeBg==4 ? 'changeBgClass' : '']" @click="select(4)"><text>商场</text></div>
  </div>
  <div>
  <scroller class="item-container" :style="{ height: contentHeight + 'px' }">
    <div :class="['content-item',isSelectOne==index?'selectOneBg':'']" v-for="(item,index) in poiItems" @click="selectOne(item,index)">
      <text class="title">{{item.title}}</text>
      <text class="address-c">{{item.address}}</text>
    </div>
  </scroller>
  </div>
</div>
</template>

<style>
  .item-container{
    width: 750px;
  }
  .map{
    width:750px;
    height: 600px;
    background-color: #000;
  }
  .bottom-layout{
    width: 750px;
    height: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .commom-sty{
    flex: 1;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-color: gainsboro;
  }
  .changeBgClass{
    background-color: goldenrod;
  }
  .content-item{
      height: 100px;
      width: 750px;
      flex-direction: column;
      flex-wrap: nowrap;
      padding-left: 20px;
      justify-content: center;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: gainsboro;
  }
  .title{
    color:#808080;
    font-size: 20px;
  }
  .address-c{
    font-size: 30px;
  }
  .selectOneBg{
    background-color:aliceblue;
  }
</style>

<script>
var Amap = weex.requireModule('amap')
Amap.initAmap('b14e524862cadf492b37c4b9441337d8')
import TopBar from '../../components/TopBar.vue'
  module.exports = {
    components: {TopBar},
    data: {
      pos:[116.487, 40.00003],
      changeBg:1,
      poiItems:{},
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight-600-80,
      isSelectOne:0,
      addressData:''
    },

    methods: {
      setUserLocation() {
        const self = this;
        Amap.getUserLocation(self.$refs['map2017'],function (data) {
          if(data.result == 'success') {
            console.log("123");
            console.log(data);
          }
        });  
        console.log("456");
    },
    finish(parm){
       this.poiItems = parm.data;
    },
    select(i){
        this.changeBg=i;
        this.$refs['map2017'].setSelectOption(i);
        this.isSelectOne =0;
    },
    selectOne(item,index){
        this.isSelectOne =index;
        this.addressData = item.address;
        this.$notice.toast({
            message:'你选择了'+item.title
        })
    },
    commitAddress(){
      let that = this;
      if(!!this.addressData){
      this.$router.setBackParams({
        name: that.addressData
      })
      this.$router.back({
          type: 'PUSH',
          callback() {
          }
      })
      }else{
        this.$notice.toast({
            message:'请选择地址'
        })
      }
    }
    }
  };
</script>