<template>
     <!-- 品牌商 -->
            <div class="brandList background-local" v-show="brands.length>0">
                <text class="type-title font-md">品牌制造商直供</text>
                <div class="brandBox">
                <div class="brand" v-for="item in brands">
                  <image  class="brandImg" :src="item.picUrl" resize="stretch"></image>
                  <div class="brandInfo">
                     <text class="font-md color-vice">{{item.name}}</text>
                     <text class="font-md color-vice">{{item.floorPrice}}元起</text>
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
         brands:[
                  {"floorPrice":12.9,"listPicUrl":"http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png","simpleDesc":"严选精选了MUJI制造商和生产原料，\\n用几乎零利润的价格，剔除品牌溢价，\\n让用户享受原品牌的品质生活。","isNew":"1","isShow":"1","rowId":1,"picUrl":"http://yanxuan.nosdn.127.net/4ea3f1e60dd77c45c218e503d721a1ed.jpg","locationId":"ksvw282f2","sortOrder":2,"name":"MUJI制造商","newPicUrl":"http://yanxuan.nosdn.127.net/4ea3f1e60dd77c45c218e503d721a1ed.jpg","appListPicUrl":"http://yanxuan.nosdn.127.net/1541445967645114dd75f6b0edc4762d.png","id":"1001000","shopId":"gy9sc97vk","newSortOrder":2},
                  {"floorPrice":29,"listPicUrl":"http://yanxuan.nosdn.127.net/8ca3ce091504f8aa1fba3fdbb7a6e351.png","simpleDesc":"严选从世界各地挑选毛巾，最终选择了为日本内野代工的工厂，追求毛巾的柔软度与功能性。品质比肩商场几百元的毛巾。","isNew":"1","isShow":"1","rowId":2,"picUrl":"http://yanxuan.nosdn.127.net/e50654982984206b54e9226e5ab7f90c.jpg","locationId":"ksvw282f2","sortOrder":10,"name":"内野制造商","newPicUrl":null,"appListPicUrl":"http://yanxuan.nosdn.127.net/8ca3ce091504f8aa1fba3fdbb7a6e351.png","id":"1001002","shopId":"gy9sc97vk","newSortOrder":10},
                  {"floorPrice":49,"listPicUrl":"http://yanxuan.nosdn.127.net/335334d0deaff6dc3376334822ab3a2f.png","simpleDesc":"严选找到为Adidas等品牌制造商，\\n选取优质原材料，与厂方一起设计，\\n为你提供好的理想的运动装备。","isNew":"1","isShow":"1","rowId":3,"picUrl":"http://yanxuan.nosdn.127.net/6f954ea8cee30e161dda048ffbfd950f.png","locationId":"ksvw282f2","sortOrder":30,"name":"Adidas制造商","newPicUrl":null,"appListPicUrl":"http://yanxuan.nosdn.127.net/335334d0deaff6dc3376334822ab3a2f.png","id":"1001003","shopId":"gy9sc97vk","newSortOrder":10},
                  {"floorPrice":29,"listPicUrl":"http://yanxuan.nosdn.127.net/0d72832e37e7e3ea391b519abbbc95a3.png","simpleDesc":"严选找到日本知名服装UNIQLO的制造商，\\n选取优质长绒棉和精梳工艺，\\n与厂方一起设计，为你提供理想的棉袜。","isNew":"1","isShow":"1","rowId":4,"picUrl":"http://yanxuan.nosdn.127.net/f3d196c03f8aac5625faba00d670ee03.jpg","locationId":"ksvw282f2","sortOrder":12,"name":"优衣库制造商","newPicUrl":null,"appListPicUrl":"http://yanxuan.nosdn.127.net/0d72832e37e7e3ea391b519abbbc95a3.png","id":"1001007","shopId":"gy9sc97vk","newSortOrder":10}
         ]
        }
    },
    components: { },
    methods: {

    }
  }
</script>

<style scoped>
.font-md{
		font-family: -apple-system-font, "Helvetica Neue", sans-serif;
		font-size:32px;
	}
    .color-vice{color:#fff}
    .background-local{background-color:#ffffff}
    /*以上为全局app无法使用全局*/
    .brandList{
    	margin-top: 10px;
    }
    .brandBox{
    	display: flex;
    	flex-direction:row;
        flex-wrap:wrap;
    	align-items: left;
    	justify-content: left;
    }
    .brand{
    	width:375px;
    	position: relative;
    }
    .brandImg{
        width:375px;
        height:253px;
    }
    .brandInfo{
    	position: absolute;
    	z-index: 2;
    	left: 0;
    	top: 0;
    	padding:20px;
    }
    .type-title{
    	text-align:center;
    	height: 100px;
    	line-height: 100px;
    }
</style>