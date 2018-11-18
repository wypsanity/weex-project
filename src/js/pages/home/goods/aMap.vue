<template>
<div>
  <top-bar></top-bar>
  <div class="container" :style="{ height: contentHeight + 'px' }">
      <weex-amap :style="{ height: contentHeight + 'px' }" class="map" id="map2017" scale="true" geolocation="true" :center="pos" >
        <weex-amap-marker :position="point.position" :title="point.title"></weex-amap-marker>
      </weex-amap>
  </div>
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
</style>

<script>
import TopBar from '../../components/TopBar.vue'
  module.exports = {
    components: {TopBar},
    data: {
      pos:[116.487, 40.00003],
      point: {
        position: [116.487, 40.00003],
        title: 'this is a marker',
      },
     contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
    },
    created () {
         var amap = weex.requireModule('amap')
         amap.initAmap('819200e856393bd6d252fd8932fffee2')
        console.log("890")
        this.$geo.get().then(data => {
            this.$notice.toast({message:'789'})
        }, error => {
            this.$notice.toast({message:'789'})
        })
    },
  }
</script>