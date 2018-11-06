<template>
    <!-- good-grid -->
    <div>
         <div class="newproduct-section">
            <div class="layout-box">
                <div class="popular-box" v-for="good in categoryGood">
                    <div class="new-image-box">
                        <image class="new-image" :src="good.listPicUrl" resize="stretch"></image>
                    </div>
                    <div class="new-text-box">
                        <text class="name">{{good.name}}</text>
                        <text class="price">￥{{good.retailPrice}}</text>
                    </div>
                </div>
            </div>

         </div>
    </div>
</template>
<script>
  export default {
  props:{
      categoryGood:{
          type:Array
      }
  },
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
    .newproduct-section{
        width:750px;
        margin-top: 10px;
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
</style>
