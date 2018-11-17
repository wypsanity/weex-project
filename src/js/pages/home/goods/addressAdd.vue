<template>
  <div>
    <top-bar></top-bar>
    
      <wxc-cell title="绿色"
            :has-top-border="true">
            <input class="input" style="tint-color: #4cbd34;" type="text" placeholder="请输入..." value="" />
        </wxc-cell>
        <wxc-cell title="蓝色"
            :has-top-border="true">
            <input class="input" style="tint-color: #1da1f2;" type="text" placeholder="请输入..." value="" />
        </wxc-cell>
         <input class="input" style="tint-color: red;" type="text" placeholder="Input Text" value=""/>
  </div>
</template>

<style scoped>
.item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
.input-layout{
    background-color: #fff;
    border-bottom-color:#d9d9d9;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}
.input {
    width: 500px;
    height: 100px;
    margin-left: 10px;
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
        
      }
    }
  };
</script>