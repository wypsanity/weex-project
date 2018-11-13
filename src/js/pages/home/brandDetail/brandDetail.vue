<template>
  <div>
    <top-bar></top-bar>
    <list class="item-container" ref="list" :showLoadMore="true" @loadMore="showload" :style="{ height: tabPageHeight + 'px' }">
      <cell>
      <div class="name">
        <image style="width:750px;height:500px" resize="stretch" @click="previewImg(brand.appListPicUrl)" :src="brand.appListPicUrl"></image>
        <text class="txt">{{brand.name}}</text>
      </div>
      <text class="desc">{{brand.simpleDesc}}</text>
      </cell>
      <cell>
      <good-grid :categoryGood="goodsList"></good-grid>
      </cell>
    </list>
    
  </div>
</template>

<style scoped>
  .item-container {
    width: 750px;
  }
  .name{
    position:relative;
  }
  .txt{
    position: absolute;
    top: 250px;
    left: 300px;
    color:#fff;
    width: 250px;
    height: 30px;
  }
  .desc{
    background-color: #fff;
    width: 750px;
    height: 200px;
    overflow:hidden;
    padding: 40px 30px;
    color:#666;
    text-align:center;
  }
</style>
<script>
  import {Utils} from 'weex-ui';
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import GoodGrid from '../components/GoodGridTwo.vue'
  export default {
    components: {TopBar,GoodGrid},
    data: () => ({
      app:{},
      id:'',
      page: 1,
      size: 10,
      brand:{},
      goodsList:[]
    }),
    created () {
      this.app = this.$storage.getSync('app')
      this.tabPageHeight = Utils.env.getPageHeight();
      this.$router.getParams().then(resData => {
            this.id=resData.id;
            this.getBrand();
        })
    },
    mounted(){
      //this.getBrand();
    },
    beforeCreate() {
    },
    methods: {
      getBrand: function () {
            var that = this;
            this.$get({
                    url: api.BrandDetail+"?authId="+that.app.globalData.authId,
                    data: {
                      id:that.id
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                         this.brand= res.data[0];
                         this.getGoodsList();
                    }

                }, error => {
                })
        },
        getGoodsList: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsList+"?authId="+that.app.globalData.authId,
                    data: {
                        brandId: that.id, 
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
        previewImg(url){
          this.$image.preview({
            index:0,
            images:[url],
          });
        },
        showload(){
            var that = this;
            that.page=that.page+1;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsList+"?authId="+that.app.globalData.authId,
                    data: {
                        brandId: that.id, 
                        pageNum: that.page, 
                        pageSize: that.size
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        if (!!res.data.goodsList.length) {
                            var goods_list = that.goodsList;
                            for (var i = 0; i < res.data.goodsList.length; i++) {
                              goods_list.push(res.data.goodsList[i]);
                            }
                            this.goodsList=goods_list;  
                            this.$refs["list"].loadMoreEnd()                    
                        }else{
                            this.$notice.toast({
                              message:'没有更多商品'
                          });
                          that.page = that.page - 1;
                          this.$refs["list"].loadMoreEnd()
                          return;
                        }
                    }
                }, error => {
                  this.$refs["list"].loadMoreEnd()
                })
        },
      
    }
  };
</script>