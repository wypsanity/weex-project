<template>
    <div>
    <slider class="slider" auto-play="true" interval="5000" infinite="false">
        <div class="frame" v-for="img in banners">
            <image class="image" resize="stretch" :src="img.imageUrl"></image>
        </div>
        <indicator class="indicator"></indicator>
    </slider>

    <div :class="['m-menu',channels.length>=5 ? 'm-menuMore' : '']">
              <div class="m-menu-item" v-for="item in channels" @click="jump(item.url)">
                <image class="m-image" :src="item.iconUrl"></image>
                <text class="m-menu-text">{{item.name}}</text>
              </div>
    </div>
    <home-brand :brands="brands"></home-brand>
    <new-product :newGoods="newGoodss"></new-product>
    <popular-product :hotGoods="hotGoodss"></popular-product>
    <shop-selection :locationList="locationList"></shop-selection>
    <good-grid :category-good="item" v-for="(item,index) in categoryGoodss" :key="index" v-if="categoryGoodss.length>0"></good-grid>
    </div>
</template>
<script>
  import HomeBrand from './components/HomeBrand.vue';
  import NewProduct from './components/NewProduct.vue';
  import PopularProduct from './components/PopularProduct.vue';
  import ShopSelection from './components/ShopSelection.vue';
  import GoodGrid from './components/GoodGrid.vue';
  import api from '../../config/url.apis';
  export default {
  data () {
        return {
          app:{},
          newGoodss: [],
          hotGoodss: [],
          topics: [],
          brands: [],
          categoryTree:{},
          banners: [],
          channels: [],
          gbuyOrders: [],//团购订单
          locationList: [],
          page: 1,
          shopId: '',
          locationId: '',
          categoryGoodss:[],
          jsessionid:''
        }
      },
    components: {
     "home-brand":HomeBrand,
     "new-product":NewProduct,
     "popular-product":PopularProduct,
     "shop-selection":ShopSelection,
     "good-grid":GoodGrid
    },
    created() {
        this.app = this.$storage.getSync('app')
        this.jsessionid = this.app.globalData.userInfo.jsessionid;
        this.getBanners();
        this.getChannels();
        this.getBrands();
        this.getNewGoodss();
        this.getHotGoodss();
        this.getCategoryGoodss();
        this.getTopics();
        this.getLocation();
        this.getCategoryTree();
    },
    mounted(){
    },
    methods: {
      wxcButtonClicked (e){
        console.log(e);
      },
      jump (url){
          var name = url.split("?")[1];
          var oneID = name.split("&")[0];
          var id = oneID.split("=")[1];
          this.$router.open({
            name: 'pages.home.channels',
            navShow : false,
            params:{id:id}
        })
      },
      getBanners(){
            var that = this;
            this.$get({ 
                url: api.IndexBanners + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.banners=res.data;
                }
            }, error => {
            })
      },
      getChannels(){
            var that = this;
            this.$get({ 
                url: api.IndexChannels + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.channels=that.dealUrl(res.data)
                }
            }, error => {
            })
      },
      //处理频道跳转链接类型
      dealUrl: function (channel){
        channel.forEach(item => {
          if (item.isToUrl == "0") {
            item.url = "../category/category?id=" + item.categoryId
          }
        })
        return channel;
      },
      getBrands(){
            var that = this;
            this.$get({ 
                url: api.IndexBrands + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.brands=res.data
                }
            }, error => {
            })
      }, 
      getNewGoodss(){
            var that = this;
            this.$get({ 
                url: api.IndexNewGoodss + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.newGoodss=res.data
                }
            }, error => {
            })
      },
      getHotGoodss(){
            var that = this;
            this.$get({ 
                url: api.IndexHotGoodss + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.hotGoodss=res.data
                }
            }, error => {
            })
      },
      getCategoryGoodss(){
            var that = this;
            this.$get({ 
                url: api.IndexCategoryGoodss + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.categoryGoodss=res.data
                 that.app.indexData.categoryGoodss = res.data
                 this.$storage.setSync('app', that.app)
                 //app.globalData.authType="abc"
                 //console.log(app.globalData.authType);
                // console.log(this);
                 //var aName = this.$event.emit('AeventName');
                 //console.log(aName);
                }
            }, error => {
            })
      },
      getTopics(){
            var that = this;
            this.$get({ 
                url: api.IndexTopics + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                 this.topics=res.data;
                }
            }, error => {
            })
      },
      getLocation(){
          
          var that = this;
          let params = {
          pageNum: that.page,
          pageSize: 4,
          authId: that.app.globalData.authId
        }
        if (that.shopId != '' && that.shopId != undefined) {
          params.shopId = that.shopId;
        } else if (that.locationId != '' && that.locationId != undefined) {
          params.locationId = that.locationId;
        }
        this.$get({ 
            url: api.showLocation+'?pageNum='+params.pageNum+'&pageSize='+params.pageSize+'&authId='+params.authId
        }).then(res =>{
            if (res.tips.isOk) {
              var data = [];
              if(res.data.length>=4){
              for(var i = 0;i<4;i++){
                data.push(res.data[i]);
              }
              }else{
                for (var i = 0; i < res.data.length; i++) {
                  data.push(res.data[i]);
                }
              }
              this.locationList=data;
              
            }
        }, error => {
        })
      },
      getCategoryTree(){
            var that = this;
            this.$get({ 
                url: api.CatalogList + "?authId=" + that.app.globalData.authId
            }).then(res =>{
                if (res.tips.isOk) {
                  this.categoryTree=res.data;
                  that.app.indexData.categoryTree = res.data
                 this.$storage.setSync('app', that.app)
                  this.$event.emit('getCatalog')
                }
            }, error => {
            })
      },
    }
  }
</script>
<style scoped>
  .iconfont {
          font-family:iconfont;
      }
      .image {
          width: 750px;
          height: 430px;
      }
      .slider {
          width: 750px;
          height: 430px;
      }
      .frame {
          width: 750px;
          height: 430px;
          position: relative;
      }
      .indicator {
          width: 750px;
          height: 40px;
          item-color: white;
          item-selected-color: #b4282d;
          item-size: 12px;
          position: absolute;
          bottom: 10px;
          right: 0px;
      }

  .m-menu {
    display: flex;
    min-height: 140px;
    width: 750px;
    flex-direction:row;
    flex-wrap:wrap;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .m-menuMore {
    justify-content: flex-start;
  }

  .m-menu-item {
    width: 150px;
    height:120px;
  }

  .m-image {
    display: block;
    width: 68px;
    height: 68px;
    margin: 0 40px;
    margin-bottom: 12px;
  }

  .m-menu-text {
    display: block;
    font-size: 24px;
    line-height: 30px;
    color: #333;
    text-align: center;
    height:25px;
  }

</style>