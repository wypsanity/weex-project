<template>
    <!-- good-grid -->
    <div>
         <div class="newproduct-section">
            <div>
            <text class="type-title font-md">{{categoryGood.name}}</text>
            </div>
            <div class="layout-box">
                <div class="popular-box" v-for="good in categoryGood.goodsList">
                    <div class="new-image-box">
                        <image class="new-image" :src="good.listPicUrl" resize="stretch"></image>
                    </div>
                    <div class="new-text-box">
                        <text class="name">{{good.name}}</text>
                        <text class="price">￥{{good.retailPrice}}</text>
                    </div>
                </div>
                <div class="txtdiv">
                    <text class="txt">更多{{categoryGood.name}}好物</text>
                    <image class="icon" src="bmlocal://assets/images/icon_go_more.png" resize="stretch"></image>
                </div>
            </div>

         </div>
    </div>
</template>
<script>
  export default {
  props:['categoryGood'],
  	watch: {
  	},
   computed:{
   },
   data () {
        return {
        category:{},
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
        margin-top: 10px;
    }
    .type-title{
        text-align:center;
        height: 100px;
        line-height: 100px;
    }
    .popular-box{
        margin-left:10px;
        margin-bottom:10px;
        height:450px;
        width:360px;
        background-color:#ffffff;
    }
    .layout-box{
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .new-image-box{
        width:360px;
        height:360px;
    }
    .new-image{
        width:360px;
        height:360px;
    }
    .new-text-box{
        width:360px;
    }
    .name{
       text-align:center;
       display:block;
       width:360px;
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
    .txtdiv{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin-left:10px;
        margin-bottom:10px;
        height:450px;
        width:360px;
        background-color:#ffffff;
    }
    .txt{
        height: 33px;
        width: 360px;
        line-height: 33px;
        color: #333;
        font-size: 33px;
        text-align: center;
        margin-bottom: 50px;
    }
    .icon{
        width: 70px;
        height: 70px;
    }
</style>
