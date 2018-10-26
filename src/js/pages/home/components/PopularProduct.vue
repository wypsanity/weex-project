<template>
    <!-- 人气推荐 -->
         <div class="newproduct-section" v-if="brands.length>0">
            <div>
            <text class="type-title font-md">人气推荐</text>
            </div>
            <div class="popular-box" v-for="item in brands">
                <div class="box-left">
                    <image class="box-image" :src="item.listPicUrl" resize="stretch"></image>
                </div>
                <div class="box-right">
                    <text class="name">{{item.name}}</text>
                    <text class="desc">{{item.goodsBrief}}</text>
                    <text class="price">￥{{item.retailPrice}}</text>
                </div>
            </div>
         </div>
</template>
<script>
  export default {
   computed:{
   },
   data () {
        return {
         brands:[{"id":"1036002","categoryId":"1008008","goodsSn":"1036002","name":"高山苦荞麦枕","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"原生苦荞，健康护颈","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":5,"isDelete":"0","attributeCategory":"1008008","isNew":"0","goodsUnit":"件","primaryPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bnskvd4e1.jpg","listPicUrl":"https://www.qingqinkj.com/arc/arc/image/mktv4i2u1/bgj991b88/2018/85/15/1bnsb23b2t.png","primaryProductId":"1035005","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1006051","categoryId":"1008001","goodsSn":"1006051","name":"皇室御用超柔毛巾","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"至柔至软，热销50万条","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"条","primaryPicUrl":"http://yanxuan.nosdn.127.net/de30c41b94ce203985a228dc787fdcfa.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/ad5a317216f9da495b144070ecf1f957.png","primaryProductId":"1006120","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1009012","categoryId":"1008008","goodsSn":"1009012","name":"可水洗舒柔丝羽绒枕","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"超细纤维，蓬松轻盈回弹","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/3f2cc7a7e4472aa40c997e70efe6aeed.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/a196b367f23ccfd8205b6da647c62b84.png","primaryProductId":"1008022","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1011004","categoryId":"1036000","goodsSn":"1011004","name":"色织精梳AB纱格纹空调被","brandId":"1001000","goodsNumber":100,"keywords":null,"goodsBrief":"加大加厚，双色精彩","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"0","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/4de19773ac86263bc5f474c1351c6df4.png","listPicUrl":"http://yanxuan.nosdn.127.net/0984c9388a2c3fd2335779da904be393.png","primaryProductId":"1010014","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}]
        }
    },
    components: {},
    methods:{
    }
  }
</script>
<style scoped>
    .font-md{
		font-family: -apple-system-font, "Helvetica Neue", sans-serif;
		font-size:32px;
	}
	/*以上为全局app无法使用全局*/
    .newproduct-section{
        width:750px;
        background-color:#ffffff;
        margin-top: 10px;
    }
    .type-title{
        text-align:center;
        height: 100px;
        line-height: 100px;
    }
    .popular-box{
        border-top-width:1px;
        border-top-style:solid;
        border-top-color:#d9d9d9;
        width:750px;
        heigth:300px;
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .box-left{
        padding-top:12px;
        padding-right:12px;
        width:300px;
        height:300px;
    }
    .box-image{
        width:288px;
        height:288px;
    }
    .box-right{
        height:300px;
        width:450px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
        justify-content:center;
    }
    .name {
      display: block;
      width: 450px;
      height: 40px;
      margin-bottom: 14px;
      overflow: hidden;
      font-size: 30px;
      color: #333;
    }
    .price {
      display: block;
      line-height: 30px;
      font-size: 30px;
      color: #b4282d;
      margin-bottom: 14px;
      width: 450px;
    }
    .desc {
      width: 450px;
      display: block;
      color: #999;
      line-height: 50px;
      font-size: 25px;
      margin-bottom: 14px;
    }
</style>
