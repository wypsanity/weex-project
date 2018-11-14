<template>
  <div>
  <top-bar></top-bar>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="navList"
                :tab-styles="tabStyles"
                title-type="text"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="tabPageHeight"
                :spm-c="4307989"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">

    <scroller class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }" v-for="(item,index) in navList">
      <div v-if="tagindex==index">
      <div>
      <div class="cate-layout">
        <text class="name">{{currentCategory.name}}</text>
        <text class="desc">{{currentCategory.frontName}}</text>
      </div>
      <good-grid v-if="goodsList.length>0" :categoryGood="goodsList"></good-grid>
      </div>
      <div class="cate-layout-two" :style="{ height: (tabPageHeight - tabStyles.height-100) + 'px' }" v-if="goodsList.length<=0">
          <image style="width:300px;height:300px" src="bmlocal://assets/images/loseFind.png"></image>
          <text class="text">此类商品还未上架</text>
      </div>
      </div>
    </scroller>
  </wxc-tab-page>
  </div>
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
  .cate-layout-two{
    width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
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
  import { WxcTabPage, Utils } from 'weex-ui';
  import Config from './config';
  import api from '../../../config/url.apis';
  import GoodGrid from '../components/GoodGridTwo.vue'
  import TopBar from '../../components/TopBar.vue'
  export default {
    components: { WxcTabPage,GoodGrid,TopBar},
    data: () => ({
      app:{},
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      needSlider: true,
      isTabView: true,
      tabPageHeight: 1334,
      id:'',
      page: 1,
      size: 1000,
      currentCategory: {},
      navList: [],
      goodsList: [],
      eachList:[],
      tagindex:0,
    }),
    created () {
      this.app = this.$storage.getSync('app')
      this.tabPageHeight = Utils.env.getPageHeight();
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            this.getCategoryInfo();
        })
    },
    mounted(){
         
    },
    beforeCreate() {
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        this.tabStyles.activeBottomColor='#FFC900';
        const self = this;
        const index = e.page;
        if(this.id==this.navList[index].id){
            return;
        }
        this.tagindex=index;
        this.id=this.navList[index].id;
        this.tagindex=index;
       that.app.navList.forEach(nav=>{
            if(nav.children){
              var navIndex = 0;
            nav.children.forEach(i=>{
                if (i.id == this.id){
                    this.currentCategory=i
                }
            })
            }
        })
        this.getGoodsList();
      },
      getCategoryInfo () {     
        let that = this; 
        if (that.app.navList.length>0){
          that.app.navList.forEach(nav=>{
            if (nav.id == that.id) {
                this.navList=nav.children;
                this.nameToTitle(this.navList);
                this.tabStyles.activeBottomColor='#FFFFFF';
                this.tabStyles.activeTitleColor='#666666';
                this.currentCategory=nav;
            }else if(nav.children){
              var navIndex = 0;
            nav.children.forEach(i=>{
                  navIndex = navIndex + 1
                if (i.id == that.id){
                    this.navList=nav.children;
                    this.nameToTitle(this.navList);
                    this.currentCategory=i
                    this.tagindex = navIndex-1
                    this.$nextTick(()=>{
                        this.$refs['wxc-tab-page'].setPage(that.tagindex);
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
                        authId: that.app.globalData.authId
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        that.app.navList = res.data.children;
                        this.$storage.setSync('app', that.app)
                          that.app.navList.forEach(nav => {
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
                                  this.navList=nav.children;
                                  this.nameToTitle(this.navList);
                                  this.currentCategory=i;
                                  this.tagindex = navIndex-1
                                  this.$nextTick(()=>{
                                      this.$refs['wxc-tab-page'].setPage(that.tagindex);
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
                    url: api.GoodsList+"?authId="+that.app.globalData.authId,
                    data: {
                        categoryId: that.id, 
                        pageNum: that.page, 
                        pageSize: that.size
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                         this.goodsList=res.data.goodsList;
                    }
                }, error => {
                })
        }
      
    }
  };
</script>