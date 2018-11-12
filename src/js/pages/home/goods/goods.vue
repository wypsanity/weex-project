<template>
  <div>
  <top-bar></top-bar>
        <scroller class="item-container" :style="{ height: contentHeight + 'px' }">
        <div>
            <slider class="slider" auto-play="true" interval="5000" infinite="false" >
                <div class="frame" @click="previewImg">
                    <image class="image" resize="stretch" :src="goodsInfo.primaryPicUrl"></image>
                </div>
                <div class="frame" @click="previewImg">
                    <image class="image" resize="stretch" :src="goodsInfo.listPicUrl"></image>
                </div>
                <div class="frame" v-for="img in gallerys" @click="previewImg">
                    <image class="image" resize="stretch" :src="img.imgUrl"></image>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
         </div>
        <three-tag></three-tag>
        <div class="three-info">
            <text class="three-info-txt-a three-info-hidden">{{goodsInfo.name}}</text>
            <text class="three-info-txt-b three-info-hidden">{{goodsInfo.goodsBrief}}</text>
            <text class="three-info-txt-c three-info-hidden">￥{{goodsInfo.retailPrice}}</text>
        </div>
        <div>
             <wxc-cell title="请选择规格数量"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
        </div>
        <div style="height:20px;"></div>
        <div>
            <wxc-cell title="评价"
                    :has-arrow="true"
                    @wxcCellClicked="wxcCellClicked"
                    :has-bottom-border="true"></wxc-cell>
            <div class="comments-box">
             <div class="com-box-a">
                 <div class="com-box-a-left">
                     <image style="height:80px;width:80px;border-radius: 130px;margin-left:20px" resize="stretch" :src="comments[0].headimgurl"></image>
                     <text style="margin-left:20px;" class="three-info-hidden">{{comments[0].nickname}}</text>
                 </div>
                 <div class="com-box-a-right">
                     <text class="three-info-hidden">{{comments[0].addTime}}</text>
                 </div>
             </div>
             <div class="com-box-b">
                <div class="com-box-a-right">
                 <text class="three-info-hidden" style="margin-left:20px;">{{comments[0].remark}}</text>
                </div>
             </div>
             <div class="com-box-b" v-if="comments[0].picList&&comments[0].picList.length > 0">
                 <image style="height:80px;width:80px;margin-left:10px;" v-for="i in comments[0].picList" resize="stretch" :src="i.picUrl"></image>
             </div>
            </div>
        </div>
        <!-- <text v-html="456789"></text> -->
        <div class="goods-attr" v-if="goodsAttributes.length>0">
            <!-- <web style="wdith:750px;height:200px;" src="https://www.qingqinkj.com/arc/arc/archive/showArchive?id=1zhfzqg273"></web> -->
            <wxc-cell title="商品参数"
                :has-arrow="false"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
                <div class="goodsAttributes" v-for="item in goodsAttributes">
                    <div class="goodsAttLayout">
                        <div style="flex:1;"><text class="goodsAttText" style="color:#999;">{{item.name}}</text></div>
                        <div style="flex:3;"><text style="color:#333;" class="goodsAttText">{{item.value}}</text></div>
                    </div>
                </div>
        </div>
        <div>
             <wxc-cell title="商品详情"
                :has-arrow="true"
                @wxcCellClicked="showGoodsDetail"
                :has-top-border="true"></wxc-cell>
        </div>
        <div class="issuesLayout">
            <text style="text-align: center;width:750px;height:100px;line-height:100px;">--常见问题--</text>
            <div class="issuesone" v-for="item in issues">
                <div class="question-box"><text>{{item.question}}</text></div>
                <div class="answer" style="color:#787878;"><text style="color:#787878;">{{item.answer}}</text></div>
            </div>
        </div>
        <div class="issuesLayout">
            <text style="text-align: center;width:750px;height:100px;line-height:100px;">--大家都在看--</text>
            
        </div>
    </scroller>
    
    <div class="bar-bottom" :style="{'height': tabbarHeight}">
        <div style="flex:2;" class="box-o">
            <image class="icon" resize="stretch" :src="collectBackImage"></image>
        </div>
        <div style="flex:2;" class="box-o">
            <div style="width:60px;height:60px;position:relative;">
            <image class="icon" resize="stretch" src="bmlocal://assets/images/ic_menu_shoping_nor.png"></image>
            <text class="cart-count">0</text>
            </div>
        </div>
        <div style="flex:3;background-color:#fc0000;" class="box-buy">
            <text class="txt">立即购买立即购买</text>
        </div>    
        <div style="flex:3;background-color:#089bf0;" class="box-cantBuy">
            <text class="txt">拼团购买</text>
        </div>
        <div style="flex:3;background-color:#4c7903;" class="box-shop" @click="showweex">
            <text class="txt">加入购物车</text>
        </div> 
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }
  .bar-bottom{
    position: fixed;
    bottom: 0px;
    width: 750px;
    background-color: #fff;
    display: flex;;
    flex-direction: row;
    flex-wrap:nowrap;
  }
  .box-o{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #f4f4f4;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .icon{
      width: 50px;
      height: 50px;
  }
  .cart-count{
    height: 28px;
    width: 28px;
    z-index: 10;
    position: absolute;
    top: 0;
    right:0;
    background-color: #b4282d;
    text-align: center;
    font-size: 18px;
    color: #fff;
    line-height: 28px;
    border-radius: 130px;
  }
  .box-buy{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #f13000;
  }
  .box-cantBuy{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #089bf0;
  }
  .box-shop{
    border-right-width: 1px;
    border-right-style:solid;
    border-right-color: #4c7903;
  }
  .txt{
        color:#fff;
        text-align:center;
        line-height:120px;
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
    .image {
          width: 750px;
          height: 630px;
      }
    .slider {
        width: 750px;
        height: 630px;
    }
    .frame {
        width: 750px;
        height: 630px;
        position: relative;
    }
    .three-info{
        width:750px;
        height:250px;
        background-color:#fff;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
        justify-content:center;
        align-items:center;
    }
    .three-info-txt-a{
        font-size:60px;
        height:60px;
    }
    .three-info-hidden{overflow:hidden;}
    .three-info-txt-b{
        font-size:20px;
        height:20px;
        color:#999;
         margin-top:20px;
    }
    .three-info-txt-c{
        margin-top:20px;
        font-size:40px;
        color:#b4282d;
        height:40px;
    }
    .comments-box{
        background-color:#fff;
        width:750px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }        
    .com-box-a{
        height:100px;
        display:flex;
        flex-direction:row;
    }
    .com-box-b{
        height:100px;
    }
    .com-box-a-left{
        flex:1;
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    .com-box-a-right{
        flex:2;
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    .goods-attr{
        width:750px;
        background-color:#fff;
    }
    .goodsAttLayout{
        display: flex;;
    flex-direction: row;
    flex-wrap:nowrap;
        background-color:#f7f7f7;
        height:60px;
        margin-top:20px;
    }
    .goodsAttributes{padding:0px 20px;margin-bottom:20px;}
    .goodsAttText{
        font-size:50px;
    }
    .issuesLayout{
        background-color:#fff;
    }
    .issuesone{
        margin-bottom:10px;
    }
    .question-box{
        padding-left:20px;
    }
    .answer{
        padding-left:40px;
    }
</style>
<script>
  import {Utils} from 'weex-ui';
  import app from '../../app';
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  import ThreeTag from '../../components/ThreeTag.vue'
  import { WxcCell } from 'weex-ui';
  export default {
    components: {TopBar,ThreeTag,WxcCell},
    data: () => ({
      id:'',
      page: 1,
      size: 10,
      goodsInfo:{},
      collectBackImage: "bmlocal://assets/images/icon_collect.png",
      gallerys:[],
      tabbarHeight: weex.config.eros.tabbarHeight ? weex.config.eros.tabbarHeight : 120,
      contentHeight:weex.config.eros.realDeviceHeight-weex.config.eros.tabbarHeight-weex.config.eros.navBarHeight-weex.config.eros.statusBarHeight,
      comments: [],
      commentsTotal:0,
      goodsAttributes: [],
      issues: [],
    }),
    created () {
    },
    mounted(){    
    },
    beforeCreate() {
        var that = this;
      this.$router.getParams().then(resData => {
            that.id= resData.item.id;
            that.goodsInfo = resData.item;
            this.getGoodsGallerys();
            this.getGoodsComments();
            this.getGoodsAttributes();
            this.getGoodsIssues();
            this.getGoodsInfo();
        })
    },
    methods: {
        previewImg(e){
            var images = [];
            images.push(this.goodsInfo.primaryPicUrl);
            images.push(this.goodsInfo.listPicUrl);
            this.gallerys.forEach(element => {
                images.push(element.imgUrl);
            });
          this.$image.preview({
            index:0,
            images:images,
          });
        },
      getGoodsGallerys: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsGallerys + '?jsessionid=' + app.getUserInfo().jsessionid +"&authId="+app.getAuthId(),
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.gallerys=res.data
                    }
                }, error => {
                })
        },
        getGoodsComments: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsComments + '?jsessionid=' + app.getUserInfo().jsessionid +"&authId="+app.getAuthId(),
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.comments=res.data;
                        this.commentsTotal=res.total;
                    }
                }, error => {
                })
        },
        getGoodsAttributes: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsAttributes + '?jsessionid=' + app.getUserInfo().jsessionid +"&authId="+app.getAuthId(),
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.goodsAttributes=res.data;
                    }
                }, error => {
                })
        },
        getGoodsIssues: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsIssues + '?jsessionid=' + app.getUserInfo().jsessionid +"&authId="+app.getAuthId(),
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                        this.issues=res.data;
                    }
                }, error => {
                })
        },
        getGoodsInfo: function () {
            var that = this;
            this.$fetch({
                    method: 'GET',    
                    url: api.GoodsInfo + '?jsessionid=' + app.getUserInfo().jsessionid +"&authId="+app.getAuthId(),
                    data: {
                         goodsId: that.id 
                    }
                }).then(res => {
                    if (res.tips.isOk) {
                       //console.log(res);
                       let goodsInfo = res.data
                       that.getGoodsRelated(goodsInfo.categoryId, goodsInfo.id); 
                    }
                }, error => {
                })
        },
        getGoodsRelated: function (categoryId, goodsId) {
            let that = this;
            let indexDataFloorGoods = app.indexData.categoryGoodss
            console.log(app.globalData.authType);
            // let categoryList = app.indexData.categoryTree.children
            // categoryList.forEach(c => {
            // let children = c.children;
            // if (children != null && children.length > 0) {
            //     if (children.some(ca => ca.id == categoryId)) {
            //     if (indexDataFloorGoods != null && indexDataFloorGoods.length > 0) {
            //         indexDataFloorGoods.forEach(category => {
            //         if (c.id == category.id) {
            //             that.setData({
            //             relatedGoods: category.goodsList,
            //             });
            //         }
            //         })
            //     }
            //     }
            // }
            // })   
  },
        showweex(){
            console.log(weex.config);
        },
        wxcCellClicked(e){
            console.log(e);
        },
        showGoodsDetail(){
          var that = this;
          this.$router.open({
            name: 'pages.home.goodsDetail',
            navShow : false,
            params:{id:that.id}
        })
        }
    }
  };
</script>