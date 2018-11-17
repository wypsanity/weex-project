<template>
  <div>
    <top-bar></top-bar>
     <scroller class="item-container" :style="{ height: contentHeight + 'px' }">
    <text>编辑优惠卡</text>
    </scroller>
  </div>
</template>

<style scoped>
.item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  export default {
    components: {TopBar},
    data: () => ({
      app:{},
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
    }),
    created () {
      this.app = this.$storage.getSync('app')
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