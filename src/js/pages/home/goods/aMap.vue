<template>
<div>
  <top-bar></top-bar>
  <div class="container" :style="{ height: contentHeight + 'px' }">
      <weex-amap :style="{ height: contentHeight + 'px' }" class="map" id="map2017" scale="true" geolocation="true" :center="pos" >
        <weex-amap-marker :position="point.position" :title="point.title"></weex-amap-marker>
      </weex-amap>
  </div>
  <div @click="setUserLocation" class="btnbox"><text>set location </text></div>
</div>
</template>

<style>
  .container{
    position: relative;
    height: 500px;
  }
  .map{
    width:750px;
    height: 600px;
    background-color: #000;
  }
  .btnbox{
    width: 750px;
    height: 200px;

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
      point: {
        position: [116.487, 40.00003],
        title: 'this is a marker',
      },
     contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight-200,
    },
    beforeCreate () {
		},
    created () {
        
    },
    mounted(){ 
      console.log('456');
      var ref= this;
      console.log(ref);
    },
    methods: {
      setUserLocation() {
        this.$geo.get().then(
                data => {
                    this.$notice.alert({
                        message:
                            '经度: ' +
                            data.locationLng +
                            '\r\n\r\n纬度: ' +
                            data.locationLat,
                        okTitle: '确认',
                        callback () {
                            // 点击确认按钮的回调
                        }
                    });
                },
                error => {
                    this.$notice.toast({
                        message: '获取位置失败'
                    });
                    console.log(error);
                }
            );
    }
  }
  }
</script>