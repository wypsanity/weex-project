<template>
  <div>
    <top-bar></top-bar>
    <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                title-type="text"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="contentHeight"
                :spm-c="4307989"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    </wxc-tab-page>
  </div>
</template>

<style scoped>
</style>
<script>
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import { WxcTabPage} from 'weex-ui';
  export default {
    components: {TopBar,WxcTabPage},
    data: () => ({
      id:'',
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      tabTitles: [{title:'全部'},{title:'有图'}],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#3D3D3D',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 70,
        iconHeight: 70,
        width: 160,
        height: 120,
        fontSize: 24,
        hasActiveBottom: true,
        activeBottomColor: '#FFC900',
        activeBottomHeight: 6,
        activeBottomWidth: 120,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      needSlider: true,
      supportSlide: true,
      isTabView: true,
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
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        
      },
    }
  };
</script>