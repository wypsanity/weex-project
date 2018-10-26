<template>
    <div class="wrapper">
        <div class="header" @click="jumpWeb('http://m.you.163.com/ucenter')">
            <image class="header-bg" resize="stretch" src="http://yanxuan.nosdn.127.net/6ae93353e95b3450a2710bb43f925a63.jpg"></image>
            <image class="i-photo" resize="stretch" src="http://yanxuan.nosdn.127.net/885e3901d0a3501362530435d76bebb3.jpg"></image>
            <text class="i-name">abcabc</text>
            <div class="b-tlt">
                <text class="i-tag tag-v8 iconfont">&#xe6cc;</text>
                <text class="txt-tag">品质生活家</text>
            </div>
            <wxc-icon class="b-qrcode" name="more"></wxc-icon>
        </div>
        <div class="s-box cell-button">
            <div class="box-tlt border-bottom">
                <text class="box-txt">我的订单</text>
                <wxc-icon class="i-box-in" name="more"></wxc-icon>
            </div>
            <div class="box-line line-serve border-bottom">
                <div class="i-box-l">
                    <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/wallet.png"></image>
                    <text class="i-box-tlt">待付款</text>
                </div>
                <div class="i-box-l">
                    <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/package.png"></image>
                    <text class="i-box-tlt">待发货</text>
                </div>
                <div class="i-box-l">
                    <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/shipped.png"></image>
                    <text class="i-box-tlt">待收货</text>
                </div>
                <div class="i-box-l">
                    <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/chat.png"></image>
                    <text class="i-box-tlt">待评价</text>
                </div>
                <div class="i-box-l">
                    <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/ic_menu_topic_nor.png"></image>
                    <text class="i-box-tlt">待成团</text>
                </div>
            </div>
        </div>
        <div class="s-box">
            <div class="box-tlt border-bottom">
                <text class="box-txt">我的服务</text>
                <wxc-icon class="i-box-in" name="more"></wxc-icon>
            </div>
            <div class="box-line line-serve border-bottom">
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/plant.png"></image>
                        <text class="i-box-tlt">会员福利</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/tickets.png"></image>
                        <text class="i-box-tlt">优惠券</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/like.png"></image>
                        <text class="i-box-tlt">我的收藏</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/footprint.png"></image>
                        <text class="i-box-tlt">我的足迹</text>
                    </div>
            </div>  
            <div class="box-line line-serve border-bottom">
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/money.png"></image>
                        <text class="i-box-tlt">会员福利</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/placeholder.png"></image>
                        <text class="i-box-tlt">优惠券</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/telemarketer.png"></image>
                        <text class="i-box-tlt">我的收藏</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/feedback.png"></image>
                        <text class="i-box-tlt">我的足迹</text>
                    </div>
            </div>
            <div class="box-line line-serve border-bottom">
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/smartphone.png"></image>
                        <text class="i-box-tlt">会员福利</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/orderPrompt_t.png"></image>
                        <text class="i-box-tlt">优惠券</text>
                    </div>
                    <div class="i-box-l">
                        <image class="i-box-icon" resize="stretch" src="bmlocal://assets/images/payTips.png"></image>
                        <text class="i-box-tlt">我的收藏</text>
                    </div>
                    <div class="i-box-l">
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
// import he from '../utils/he';
import { SERVICES } from './cart'
import { WxcIcon } from 'weex-ui'
// Vue.filter('myFilter', function(value) {
//     return he.decode(value);
// })

export default {
    components: { WxcIcon },
    mounted() {
        this.getService()
    },
    data() {
        return {
            services: [],
            serviceLength: 0,
            statusHeight: Number.parseInt(this.statusBarHeight || weex.config.env.statusBarHeight || 40)
        }
    },
    methods: {
        jumpWeb(_url) {
            this.$router.toWebView({
                url: _url,
                title: '',
                navShow: true,
            })
        },
        getService() {
        	// this.$fetch({
         //        method: 'GET',
         //        name: 'yanxuan_my_getService',
         //        data: {}
         //    }).then(resData => {
         //        this.services = resData.data
         //        this.getLength()
         //    }, error => {

         //    })

         this.services = SERVICES
         this.getLength()
        },
        getLength() {
            this.serviceLength = Math.ceil(this.services.length / 4)
        }
    }
}
</script>
<style lang="sass" src="./cart.scss" scoped></style>