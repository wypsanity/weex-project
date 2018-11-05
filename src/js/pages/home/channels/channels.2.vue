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
    <scroller class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
      <div v-if="goodsList.length>0">
      <div class="cate-layout">
        <text class="name">{{currentCategory.name}}</text>
        <text class="desc">{{currentCategory.frontName}}</text>
      </div>
      <good-grid :categoryGood="goodsList"></good-grid>
      </div>
      <div class="cate-layout" v-if="goodsList.length<=0">
          <text class="text">此类商品还未上架</text>
      </div>
    </scroller>
  </wxc-tab-page>
</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .cate-layout{
    width: 750px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .name{
    height:35px;
    margin-bottom:10px;
    font-size:30px;
    color:#333;
  }
  .desc{
    height:24px;
    font-size:24px;
    color:#999;

  }
  </style>
<script>
  import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
  import Config from './config';
  import app from '../../app';
  import api from '../../../config/url.apis';
  import GoodGrid from './GoodGrid.vue'
  export default {
    components: { WxcTabPage, WxcPanItem,GoodGrid},
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      needSlider: true,
      supportSlide: true,
      isTabView: true,
      tabPageHeight: 1334,
      id:'',
      page: 1,
      size: 1000,
      currentCategory: {},
      navList: [],
      goodsList: [],
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            console.log(this.id);
        })
        
    },
    mounted(){
         this.getCategoryInfo();
    },
    beforeCreate() {
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        this.tabStyles.activeBottomColor='#FFC900';
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
        if (app.navList.length>0){
          app.navList.forEach(nav=>{
            if (nav.id == that.id) {
                this.navList=nav.children;
                this.nameToTitle(this.navList);
                this.tabStyles.activeBottomColor='#FFFFFF';
                this.tabStyles.activeTitleColor='#666666';
                this.currentCategory=nav;
            }else if(nav.children){
              var navIndex = 0;
            nav.children.forEach(i=>{
                if (i.id == that.id){
                    navIndex = navIndex + 1
                    this.navList=nav.children;
                    this.nameToTitle(this.navList);
                    this.currentCategory=i
                    this.$nextTick(()=>{
                        this.$refs['wxc-tab-page'].setPage(navIndex-1);
                    });
                return;
                }
            })
            }
        })
        that.getGoodsList();
        }else{
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
                              this.tabStyles.activeBottomColor='#FFFFFF';
                              this.tabStyles.activeTitleColor='#666666';
                          }else if (nav.children) {
                             var navIndex = 0;
                          nav.children.some(i => {
                              navIndex = navIndex + 1
                              if (i.id == that.id) {
                                console.log(i.id);
                                console.log(navIndex);
                                  this.navList=nav.children;
                                  this.nameToTitle(this.navList);
                                  this.currentCategory=i;
                                  this.$nextTick(()=>{
                                      this.$refs['wxc-tab-page'].setPage(navIndex-1);
                                  });
                                  return true;
                              }
                          })
                          }       
                      })
                      that.getGoodsList();
                    }
                }, error =>{
                })
        }
      },
      nameToTitle(list){
        list.forEach(i=>{
            i.title=i.name;
        });
      },
      getGoodsList: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsList+"?authId="+app.getAuthId(),
                    data: {
                        categoryId: that.id, 
                        pageNum: that.page, 
                        pageSize: that.size
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                         this.goodsList=res.data.goodsList;
                         console.log(this.goodsList);
                    }
                }, error => {
                })
        },
      
    }
  };
</script>