<template>
    <!-- 店铺精选 -->
         <div class="newproduct-section" v-if="locationList.length>0">
            <div>
            <text class="type-title font-md">店铺精选</text>
            </div>
            <div class="shop-box" v-for="(item,index) in locationList" v-if="index < 4">
                <div class="box-left">
                    <image class="box-image" :src="item.imgs[0].url" resize="stretch" v-if="item.imgs!=null"></image>
                    <text v-if="item.imgs==null" style="text-align:center">暂无图片</text>
                </div>
                <div class="box-right">
                    <text class="shopName">{{item.businessName}}</text>
                    <div class="bottomInfo">
                        <text class="font-Info">类别：{{item.categories}}</text>
                        <div class="row-info">
                            <text class="yellowStar" v-for="i in floatToInt(item.locationScore)" v-if="floatToInt(item.locationScore)<6">★</text>
                            <text class="white" v-for="x in getOver(item.locationScore)">☆</text>
                            <text class="font-size-Info">月售：{{item.sale.monthlySale==null || item.sale.monthlySale==''? '0': item.sale.monthlySale}}笔</text>
                        </div>
                        <text class="font-size-Info font-info-margin">{{item.province}}{{item.city}}{{item.district}}{{item.address}}</text>
                         <div class="special-layout">
                             <text class='specials' v-if="item.specialList.length>0" v-for="val in item.specialList"> {{val}} </text>
                        </div>
                    </div>
                </div>
            </div>
         </div>
</template>
<script>
  export default {
    props:['locationList'],
   computed:{
   },
   data () {
        return {

        }
    },
    components: {},
    methods:{
        floatToInt(num){
            if(num==null){
                num = 0;
            }else{
                var exam = Number(num);
                num = Math.round(exam);
            }
           return num;
        },
        getOver(num){
            if(num==null){
                num = 0;
            }else{
                var exam = Number(num);
                num = Math.round(exam);
            }
            return 5-num;
        }

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
    .shop-box{
        border-top-width:1px;
        border-top-style:solid;
        border-top-color:#d9d9d9;
        width:750px;
        height:300px;
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
        padding: 20px
    }
    .box-left{
        width:280px;
        height:280px;
        padding: 5px 0 0 18px;
    }
    .box-image{
        width:230px;
        height:150px;
    }
    .box-right{
        height:280px;
        width:430px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }
    .shopName{
        width:430px;
        font-size:30px;
        color:#373737;
    }
    .bottomInfo{
        width:430px;
        height:230px;
        display:flex;
        flex-direction:column;
        flex-wrap:nowrap;
    }
    .font-Info{
        font-size:23px;
        line-height:35px;
        color:#777;
        margin-top: 10px;
    }
    .white{
    font-size:23px;
    }
    .yellowStar{
        color:yellow;
        font-size:23px;
    }
    .font-size-Info{
        font-size:23px;
        color:#777;
    }
    .font-info-margin{
        margin-top: 10px;
    }
    .row-info{
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
        margin-top: 10px;
    }
    .special-layout{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-top: 10px;
    }
    .specials{
      margin: 10px;
      margin-left: 0px;
      padding: 5px;
      background-color: #eff4f8;
      color:#95b9d1;
      font-size:23px;
      border-radius: 10px;
      line-height: 35px;
      height: 35px;
    }
</style>
