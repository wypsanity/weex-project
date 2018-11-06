<template>
  <div>
  <top-bar></top-bar>
    <scroller class="item-container" :style="{ height: (tabPageHeight - 120) + 'px' }">
        <div @click="previewImg">
            <slider class="slider" auto-play="true" interval="5000" infinite="false" >
                <div class="frame">
                    <image class="image" resize="stretch" :src="goodsInfo.primaryPicUrl"></image>
                </div>
                <div class="frame">
                    <image class="image" resize="stretch" :src="goodsInfo.listPicUrl"></image>
                </div>
                <div class="frame" v-for="img in gallerys">
                    <image class="image" resize="stretch" :src="img.imgUrl"></image>
                </div>
                <indicator class="indicator"></indicator>
            </slider>
        </div>
    </scroller>
    <div class="bar-bottom">
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
        <div style="flex:3;background-color:#4c7903;" class="box-shop">
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
    height:120px;
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
    border-radius: 50%;
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
</style>
<script>
  import {Utils} from 'weex-ui';
  import app from '../../app';
  import api from '../../../config/url.apis';
  import TopBar from '../../components/TopBar.vue'
  export default {
    components: {TopBar},
    data: () => ({
      tabPageHeight: 1334,
      id:'',
      page: 1,
      size: 10,
      goodsInfo:{},
      collectBackImage: "bmlocal://assets/images/icon_collect.png",
      gallerys:[]
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
        })
    },
    methods: {
        previewImg(){
        //     var images = [];
        //     images.push(this.goodsInfo.primaryPicUrl);
        //     images.push(this.goodsInfo.listPicUrl);
        //     this.gallerys.forEach(element => {
        //         images.push(element.imgUrl);
        //     });
        //   this.$image.preview({
        //     index:0,
        //     images:images,
        //   });
        console.log("4564564566");
        this.$notice.toast({
            message: '消息'
        })
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
                    console.log("出错");
                })
        }
    }
  };
</script>