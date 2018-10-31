<template>
    <!-- 人气推荐 -->
         <div class="newproduct-section" v-if="hotGoods.length>0">
            <div>
            <text class="type-title font-md">人气推荐</text>
            </div>
            <div class="popular-box" v-for="item in hotGoods">
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
    props:['hotGoods'],
   computed:{
   },
   data () {
        return {
            
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
