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
        <text v-html="456789"></text>
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
            <text class="txt">立即购买</text>
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
      tabPageHeight: 1334,
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
      img:'v-html指令',
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
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
        showweex(){
            console.log(weex.config);
        },
        wxcCellClicked(e){
            console.log(e);
        }
    }
  };
</script>