<template>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="navList"
                :tab-styles="tabStyles"
                title-type="text"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="tabPageHeight"
                :spm-c="4307989"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
  
  </wxc-tab-page>
</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .border-cell{
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }
  .cell{
    background-color: #ffffff;
  }
  </style>
<script>
  const dom = weex.requireModule('dom');
  import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
  import WxcItem from './wxc-item.vue';
  import Config from './config';
  import app from '../../app';
  import api from '../../../config/url.apis';
  export default {
    components: { WxcTabPage, WxcPanItem, WxcItem },
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      tabList: [],
      needSlider: true,
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      supportSlide: true,
      isTabView: true,
      tabPageHeight: 1334,
      desc: [{
        type: 'text',
        value: '特价机票|班期:清明 3/27-4/2等',
        theme: 'gray'
      }],
      tags: [{
        type: 'tag',
        value: '满100减20测试',
        theme: 'yellow'
      }],
      id:'',
      page: 1,
      size: 1000,
      currentCategory: {},
      navList: [],
      goodsList: [],
      mytabTitle:[{"children":null,"id":"1010001","title":"内衣0","name":"内衣","keywords":null,"frontDesc":"自然染料，亲肤舒适","parentId":"1010000","sortOrder":2,"bannerUrl":"http://yanxuan.nosdn.127.net/20279e1753e4eedc6e347857acda9681.png","iconUrl":null,"imgUrl":"http://yanxuan.nosdn.127.net/02fede55aba1bc6c9d7f7c01682f9e2d.png","wapBannerUrl":null,"frontName":"给你贴身的关怀","count":8,"nodeId":"1010001"},
      {"children":null,"id":"1010001","title":"内衣1","name":"内衣","keywords":null,"frontDesc":"自然染料，亲肤舒适","parentId":"1010000","sortOrder":2,"bannerUrl":"http://yanxuan.nosdn.127.net/20279e1753e4eedc6e347857acda9681.png","iconUrl":null,"imgUrl":"http://yanxuan.nosdn.127.net/02fede55aba1bc6c9d7f7c01682f9e2d.png","wapBannerUrl":null,"frontName":"给你贴身的关怀","count":8,"nodeId":"1010001"},
      {"children":null,"id":"1010001","title":"内衣2","name":"内衣","keywords":null,"frontDesc":"自然染料，亲肤舒适","parentId":"1010000","sortOrder":2,"bannerUrl":"http://yanxuan.nosdn.127.net/20279e1753e4eedc6e347857acda9681.png","iconUrl":null,"imgUrl":"http://yanxuan.nosdn.127.net/02fede55aba1bc6c9d7f7c01682f9e2d.png","wapBannerUrl":null,"frontName":"给你贴身的关怀","count":8,"nodeId":"1010001"},
      {"children":null,"id":"1010001","title":"内衣3","name":"内衣","keywords":null,"frontDesc":"自然染料，亲肤舒适","parentId":"1010000","sortOrder":2,"bannerUrl":"http://yanxuan.nosdn.127.net/20279e1753e4eedc6e347857acda9681.png","iconUrl":null,"imgUrl":"http://yanxuan.nosdn.127.net/02fede55aba1bc6c9d7f7c01682f9e2d.png","wapBannerUrl":null,"frontName":"给你贴身的关怀","count":8,"nodeId":"1010001"},]
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      //this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      //Vue.set(this.tabList, 0, this.demoList);
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            console.log(this.id);
        })
        
    },
    mounted(){
         //this.$refs['wxc-tab-page'].setPage(5)
         this.getCategoryInfo();
    },
    beforeCreate() {
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* 未加载tab模拟数据请求 */
        // if (!Utils.isNonEmptyArray(self.tabList[index])) {
        //   setTimeout(() => {
        //     Vue.set(self.tabList, index, self.demoList);
        //   }, 100);
        // }
      },
      wxcPanItemPan (e) {
        if (BindEnv.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      },
      getCategoryInfo () {     
        let that = this; 
       
            this.$fetch({
                    method: 'GET',    
                    url: api.CatalogList,
                    data: {
                        authId: app.getAuthId()
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        app.navList = res.data.children;
                          app.navList.forEach(nav => {
                          if (nav.id == that.id){
                              this.navList=nav.children;
                              this.nameToTitle(this.navList);
                              this.currentCategory=nav;
                              this.$nextTick(()=>{
                                      this.$refs['wxc-tab-page'].setPage(2);
                                  });
                          }else if (nav.children) {
                             var navIndex = 0;
                          nav.children.forEach(i => {
                              navIndex = navIndex + 1
                              if (i.id == that.id) {
                                  this.navList=nav.children;
                                  // var arr = [];
                                  // arr.push(...nav.children);
                                  // this.navList=arr;
                                  this.nameToTitle(this.navList);
                                  this.currentCategory=i;
                                  console.log("456789");
                                  console.log(this.navList);
                                  this.$nextTick(()=>{
                                      this.$refs['wxc-tab-page'].setPage(2);
                                  });
                                  
                              }
                          })
                          }       
                      })
                    }
                }, error =>{
                })
      },
      nameToTitle(list){
        list.forEach(i=>{
            i.title=i.name;
        });
      },
      
    }
  };
</script>