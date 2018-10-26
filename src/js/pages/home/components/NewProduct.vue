<template>
     <!-- 新品首发 -->
     <div class="newproduct-section" v-if="brands.length>0">
        <div>
        <text class="type-title font-md">新品首发</text>
        </div>
        <div class="new-body">
            <div class="new-box" v-for="item in brands">
                <div class="new-image-box">
                    <image class="new-image" :src="item.listPicUrl" resize="stretch"></image>
                </div>
                <div class="new-text-box">
                    <text class="name">{{item.name}}</text>
                    <text class="price">￥{{item.retailPrice}}</text>
                </div>
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
         brands:[{"id":"1092026","categoryId":"1010002","goodsSn":"1092026","name":"let it go女式纯棉免洗内裤","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"100%纯棉，出行必备","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":1,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/3006cf6f854372683143571d3595dafc.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/56a46e9a4832587471c0f9ad7c1b7d85.png","primaryProductId":"1097157","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"1","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1127047","categoryId":"1012003","goodsSn":"1127047","name":"趣味粉彩系列笔记本","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"粉彩色泽，记录生活","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":2,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/fad166a4742ab3681808c80120eb452a.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/6c03ca93d8fe404faa266ea86f3f1e43.png","primaryProductId":"1127155","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1135072","categoryId":"1020003","goodsSn":"1135072","name":"经典海魂纹水手裙（婴童）","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"自由海军领探索未来梦","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":3,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/fe97cc9eb49397a608eb52671767f9a3.jpg","listPicUrl":"http://yanxuan.nosdn.127.net/43e57d4208cdc78ac9c088f9b3e798f5.png","primaryProductId":"1136606","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null},
         {"id":"1135073","categoryId":"1020003","goodsSn":"1135073","name":"海魂纹哈衣水手服（婴童）","brandId":"0","goodsNumber":100,"keywords":null,"goodsBrief":"经典海魂纹自由海军领","goodsDesc":null,"isOnSale":"1","addTime":null,"sortOrder":4,"isDelete":"0","attributeCategory":"0","isNew":"1","goodsUnit":"件","primaryPicUrl":"http://yanxuan.nosdn.127.net/55aac61eeb39a4ac9b60741650897453.png","listPicUrl":"http://yanxuan.nosdn.127.net/53052b04ae001d289c040e09ea92231c.png","primaryProductId":"1136618","promotionDesc":"限时购","promotionTag":null,"isLimited":"0","isHot":"0","shopLocationId":"ksvw282f2","retailPrice":1,"wholesalePrice":0,"purchasePrice":null,"floorPrice":null,"shopId":null,"locationName":null}]
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
    .new-body{
        width:750px;
        padding:0 30px 30px 30px;
        justify-content:center;
        align-items:center;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .new-box{
        width:340px;

        padding-top:10px;
        padding-left:21px;
        padding-right:21px;
    }
    .new-image-box{
       width:300px;
       height:300px;
    }
    .new-text-box{
        width:300px;

    }
    .new-image{
        width:300px;
        height:300px;
    }
    .name{
           text-align:center;
           display:block;
           width:300px;
           height:30px;
           margin-bottom:14px;
           overflow:hidden;
           font-size:25px;
           color:#333;
       }
       .price{
           display:block;
           text-align:center;
           line-height:25px;
           font-size:25px;
           color:#b4282d;
           margin-bottom:30px;
       }
</style>