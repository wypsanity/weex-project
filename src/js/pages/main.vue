<template>       
  <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div>
      <div class="status-bar" :style="{'height': statusBarHeight}"></div>
      <head :title="allTitle"></head>
      <div class="item-container-index" :style="contentStyle">  
          <scroller class="scroller" :style="contentStyle" >
               <home></home>
          </scroller>
       

      </div>
      <div class="touch-bar" :style="{'height': touchBarHeight}"></div>
    </div>
    <!-- 第二个页面内容-->
    <div>
      <div class="status-bar" :style="{'height': statusBarHeight}"></div>
      <head :title="allTitle"></head>
      <div class="item-container-index" :style="contentStyle">
      <catelog></catelog>
      </div>
    </div>
    <!-- 第三个页面内容-->
    <div>
      <div class="status-bar" :style="{'height': statusBarHeight}"></div>
      <head :title="allTitle"></head>
      <div class="item-container-index" :style="contentStyle">      
        <cart></cart>
      </div>
    </div>

    <!-- 第四个页面内容-->
    <div>
      <div class="status-bar-my" :style="{'height': statusBarHeight}"></div>
 
      <div class="item-container-index" :style="contentStyle">
        <scroller class="scroller" :style="contentStyle" >
          <my></my>
        </scroller>
      </div>
    </div>
  </wxc-tab-bar>
</template>

<style lang="scss" scoped>
  .item-container {
    width: 750px;
    background-color: red;
    align-items: center;
    justify-content: center;
  }
  .item-container-index{
    width: 750px;
    display:flex;
    flex-direction: column;
    flex-wrap:nowrap;
}
  .status-bar-my {
    width: 750px;
    height: 40px;
    background-color: #1f1f1f;
  }
  .status-bar {
    width: 750px;
    height: 40px;
    opacity:0.1;
    background-color: #ffffff;
  }
  .touch-bar {
    height: 68px;
    width: 750px;
  }
.scroller{
    width: 750px;
}


.slogan {
    width: 750px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.i-slg {
    font-size: 26px;
    text-align: center;
    color: #b4282d;
}
.head-box{
height: 66px;
padding-top: 16px;
display: flex;
flex:1;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
}
.head-image{
  width:10px;
  height:10px
}
</style>
<script>
  import { WxcTabBar, Utils,WxcMinibar} from 'weex-ui';
  import head from './home/Head.vue';
  // https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js 
  import Config from './common/config'
  import home from './home/home.vue';
  import catelog from './catelog/catelog.vue';
  import my from './my/my.vue';
  import cart from './cart/cart.vue';
  export default {
    components: { WxcTabBar,WxcMinibar,head,home,catelog,my,cart },
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      allTitle:Config.title,
      statusBarHeight: weex.config.eros.statusBarHeight ? weex.config.eros.statusBarHeight : 40,
      touchBarHeight: weex.config.eros.touchBarHeight ? weex.config.eros.touchBarHeight : 20,

    }),
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    methods: {
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        // console.log(index);
      },
      jump (url) {
        
      }
    }
  };
</script>