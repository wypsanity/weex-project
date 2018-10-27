<template>
    <div class="wrapper">
        <div class="slogan">
          <div class="head-box">
              <image class="head-image" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"></image>
              <text class="i-slg">30天无忧退换货</text>
          </div>
          <div class="head-box">
              <image class="head-image" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"></image>
              <text class="i-slg">48小时快速退款</text>
          </div>
          <div class="head-box">
              <image class="head-image" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"></image>
              <text class="i-slg">满88元免邮费</text>
          </div>
        </div>
        <div v-if="cartGoods.length<=0" class="noshop-layout" :style="contentStyle">
            <image class="noshop-image" resize="stretch" src="bmlocal://assets/images/goodcart.png"></image>
            <text style="text-align:center;color:#999">去添加点什么吧</text>
        </div>

        <div v-if="cartGoods.length>0">
         <scroller class="scroller" :style="scroStyle" >
            <div> </div>
            <div class="cart-bottom">
                <div style="height:100px;flex-grow:1;flex:1.5;" class="cart-bottom-layout">
                    <image class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-f.png"></image>             
                    <text class="hidden-text">全选({{cartTotal.checkedGoodsCount}})</text>
                </div>
                <div style="height:100px;flex-grow:2;flex:1.8;" class="cart-bottom-layout-two">
                    <text class="hidden-text" style="width: 200px;">{{'￥00000000'+cartTotal.checkedGoodsAmount}}</text>
                </div>
                <div style="height:100px;flex-grow:1;flex:0.7;" class="cart-bottom-layout">
                    <text>编辑</text>
                </div>
                <div style="height:100px;background-color:blue;flex-grow:1;flex:1;"></div>
            </div>
         </scroller>
        </div>
    </div>
</template>
<script>
// import he from '../utils/he';
import { WxcIcon,Utils } from 'weex-ui'
import Config from '../common/config'
import app from '../app.js'
// Vue.filter('myFilter', function(value) {
//     return he.decode(value);
// })

export default {
    components: { WxcIcon},
    mounted() {
        this.getCartList();
    },
    data() {
        return {
            cartGoods:[],
            cartTotal:{},
            tabStyles: Config.tabStyles,
            jsessionid:'',
            selectedValue:["1","2"],
            items:[
            {value:"1",title:'全部'},
            {value:"2",title:'选项一'},
            {value:"3",title:'选项二'},
            {value:"4",title:'选项三'}
            ]
        }
    },
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height)-66-150 + 'px' };
      this.scroStyle = { height: (tabPageHeight - tabStyles.height)-66 + 'px' };
      this.jsessionid = app.globalData.userInfo.jsessionid;
    },
    methods: {
        jumpWeb(_url) {
            this.$router.toWebView({
                url: _url,
                title: '',
                navShow: true,
            })
        },
        getCartList(){
            var that = this;
            this.$fetch({
                method: 'GET',    
                url: 'https://www.qingqinkj.com/api/mall/mall/user/userCart/getCart',
                data: {
                    jsessionid: that.jsessionid,
                }
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                 this.$notice.alert({
                    title: that.cartTotal,
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
                }
            }, error => {
                // 错误回调
                //console.log(error)
                this.$notice.alert({
                    title: "查询失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
            })
        }

    }
}
</script>
<style lang="sass" src="./cart.scss" scoped></style>