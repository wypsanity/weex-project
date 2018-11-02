<template>
   <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="navList"
                :tab-styles="tabStyles"
                title-type="text"
                :tab-page-height="tabPageHeight"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <!--<list v-for="(v,index) in tabList"
          :key="index"
          class="item-container"
          :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
      <cell class="border-cell"></cell>
    <cell v-for="(demo,key) in v"
            class="cell"
            :key="key">
        <wxc-pan-item @wxcPanItemPan="wxcPanItemPan">
            <div class="content">
                <text>{{key}}</text>
            </div>    
        </wxc-pan-item>
      </cell>
    </list>-->
    <!--<div class="border-cell"></div>
    <scroller class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
     <good-grid :categoryGood="goodsList"></good-grid>
     </scroller>-->
  </wxc-tab-page>

</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }

  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }

  .cell {
    background-color: #ffffff;
  }

  .content{
    width:750px;
    height:300px;
    border-bottom-width:1px;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
  import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
  import GoodGrid from './GoodGrid.vue'
  import Config from './config'
  import app from '../../app';
  import api from '../../../config/url.apis';
  export default {
    components:{ WxcTabPage, WxcPanItem,GoodGrid },
    data: () =>({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      tabList: [],
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      tabPageHeight: 1334,
      id:'',
      page: 1,
      size: 1000,
      currentCategory: {},
      navList: [],
      goodsList: [],
    }),
    created (){
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            console.log(this.id);
        })
        this.getCategoryInfo();
        
    },
    mounted(){
        //var page = 1;
        //console.log(this.$refs[`wxc-tab-title-${page}`]);
        this.$refs['wxc-tab-page'].setPage(5)
    },
    methods:{
      wxcTabPageCurrentTabSelected (e) {
        // const self = this;
        // const index = e.page;
        // if (!Utils.isNonEmptyArray(self.tabList[index])) {
        //   setTimeout(() => {
        //     Vue.set(self.tabList, index, self.demoList);
        //   }, 100);
        // }
      },
      wxcPanItemPan (e){
        if (BindEnv.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      },
      nameToTitle(list){
          list.forEach(i=>{
              i.title=i.name;
          });
      },
      getCategoryInfo: function () {     
        let that = this; 
        var navIndex = 0;
        if (app.navList.length>0){
        app.navList.forEach(nav=>{
            if (nav.id == that.id) {
                this.navList=nav.children;
                this.nameToTitle(this.navList);
            }else if(nav.children){
            nav.children.forEach(i=>{
                if (i.id == that.id){
                    navIndex = navIndex + 1
                    this.navList=nav.children;
                    this.nameToTitle(this.navList);
                    this.currentCategory=i
                     //this.$refs['wxc-tab-page'].setPage(5)
                return;
                }
            })
            }
        })
        that.getGoodsList();

        }else{
            this.$notice.loading.show("正在加载")
            this.$fetch({
                    method: 'GET',    
                    url: api.CatalogList,
                    data: {
                        authId: app.getAuthId()
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.$notice.loading.hide()
                        app.navList = res.data.children;
                        app.navList.forEach(nav => {
                        if (nav.id == that.id){
                            this.navList=nav.children;
                            this.nameToTitle(this.navList);
                            this.currentCategory=nav;
                        }else if (nav.children) {
                        nav.children.forEach(i => {
                            navIndex = navIndex + 1
                            if (i.id == that.id) {
                                this.navList=nav.children;
                                this.nameToTitle(this.navList);
                                this.currentCategory=i;
                                //this.$refs['wxc-tab-page'].setPage(5)
                            return;
                            }
                        })
                        }       
                    })
                    that.getGoodsList();
                    }
                }, error => {
                    this.$notice.alert({
                        title: "查询失败",
                        message: '消息',
                        okTitle: '确认',
                        callback() {
                        }
                    })
                })
        }
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