<template>
  <div>
    <top-bar></top-bar>
    <text>付款页面</text>
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
           console.log(resData);
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