<template>
     <!-- 品牌商 -->
            <div class="brandList background-local" v-show="brands.length>0">
                <text class="type-title font-md">品牌制造商直供</text>
                <div class="brandBox">
                <div class="brand" v-for="item in brands" @click="jump(item.id)">
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
    props:['brands'],
    computed:{
    },
   data () {
        return {
        
        }
    },
    components: { },
    methods: {
        jump (id){
          this.$router.open({
            name: 'pages.home.brandDetail',
            navShow : false,
            params:{id:id}
        })
      },
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