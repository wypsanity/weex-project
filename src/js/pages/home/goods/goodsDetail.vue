<template>
  <div>
    <top-bar></top-bar>
    <web :style="{height:contentHeight,width:750}" :src="url"></web>
  </div>
</template>

<style scoped>
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  export default {
    components: {TopBar},
    data: () => ({
      id:'',
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      url:''
    }),
    created () {
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            this.url='https://www.qingqinkj.com/api/mall/mall/goods/goods/showGood?goodsId='+this.id;
        })
    },
    mounted(){
    },
    beforeCreate() {
    },
    methods: {  
    }
  };
</script>