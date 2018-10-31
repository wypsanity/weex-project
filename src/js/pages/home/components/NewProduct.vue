<template>
     <!-- 新品首发 -->
     <div class="newproduct-section" v-if="newGoods.length>0">
        <div>
        <text class="type-title font-md">新品首发</text>
        </div>
        <div class="new-body">
            <div class="new-box" v-for="item in newGoods">
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
    props:['newGoods'],
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
    .new-body{
        width:750px;
        padding:0 30px 30px 30px;
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