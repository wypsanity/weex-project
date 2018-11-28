<template>
  <div>
    <top-bar></top-bar>
    
      <wxc-cell
            :has-top-border="true">
            <input class="input" style="tint-color: #4cbd34;" type="text" placeholder="姓名" value="" />
        </wxc-cell>
        <wxc-cell
            :has-top-border="true">
            <input class="input" style="tint-color: #1da1f2;" type="text" placeholder="电话" value="" />
        </wxc-cell>
         <wxc-cell
            :has-top-border="true">
            <input ref="gomap" class="input" @focus="gomap" style="tint-color: #1da1f2;" type="text" placeholder="省份丶城市丶区县" value="" />
        </wxc-cell>
  </div>
</template>

<style scoped>
.input {
    width: 750px;
    height: 100px;
    color: #6a737d;
}
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import { WxcCell } from 'weex-ui'
  export default {
    components: {TopBar,WxcCell},
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
    beforeCreate () {
    },
    methods: {  
      oninput(){
        
      },
      gomap(){
        this.$refs['gomap'].blur();
        //819200e856393bd6d252fd8932fffee2
        this.$router.open({
            name: 'pages.home.good.amap',
            navShow : false,
            params:{}
        })
      },
    },
    eros: {
        beforeBackAppear(params) {
          console.log('123123')
            console.log(params)
        }
    }
  };
</script>