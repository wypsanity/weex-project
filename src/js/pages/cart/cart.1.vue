<template>
    <div class="wrapper">
        <div class="slogan">
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">30天无忧退换货</text>
          </div>
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">48小时快速退款</text>
          </div>
          <div class="head-box pub-layout">
              <image class="head-image" src="bmlocal://assets/images/red-icon.png"></image>
              <text class="i-slg">满88元免邮费</text>
          </div>
        </div>
        <div v-if="cartGoods.length<=0" class="noshop-layout" :style="contentStyle">
            <image class="noshop-image" resize="stretch" src="bmlocal://assets/images/goodcart.png"></image>
            <text style="text-align:center;color:#999">去添加点什么吧</text>
        </div>

        <div v-if="cartGoods.length>0">
         <scroller class="scroller" :style="scroStyle" >
            <div> 
                <div v-for="(item,index) in cartGoods" class="cartGood-layout pub-layout">
                    <div style="flex:0.7" class="cart-bottom-layout pub-layout" @click="checkedItem(index)">
                    <image v-if="item.checked=='1'" class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-t.png"></image>
                    <image v-else class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-f.png"></image>
                        
                    </div>
                    <div style="flex:4;" class="pub-layout">
                        <div style="flex:1;" class="cartGood-center pub-layout">
                            <image class="cartGood-image" resize="stretch" :src="item.listPicUrl"></image>
                        </div>
                        <div style="flex:3;justify-content: center;padding-left:12px;" class="pub-layout-two">
                            <text class="cartGood-center-font">{{item.goodsName}}</text>
                            <text class="cartGood-center-font">{{item.goodsSpecifitionNameValue}}</text>
                            <text class="cartGood-center-font">￥{{item.retailPrice}}</text>
                        </div>
                    </div>
                    <div style="flex:1;justify-content: center;" class="pub-layout-two">
                        <text class="cartGood-center-font">x{{item.numbers}}</text>
                    </div>
                </div>
            </div>
            <div class="cart-bottom pub-layout">
                <div style="height:100px;flex:1.5;" class="cart-bottom-layout pub-layout" @click="checkedAll()">
                    <image v-if="checkedAllStatus" class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-t.png"></image>
                    <image v-else class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-f.png"></image>             
                    <text class="hidden-text">全选({{checkedAllStatus?cartTotal.checkedGoodsCount:0}})</text>
                </div>
                <div style="height:100px;flex:1.8;" class="cart-bottom-layout-two pub-layout">
                    <text class="hidden-text" style="width: 200px;" v-if="!isEditCart">{{'￥'+cartTotal.checkedGoodsAmount}}</text>
                </div>
                <div style="height:100px;flex:0.7;" class="cart-bottom-layout pub-layout">
                    <text>{{!isEditCart?'编辑':'完成'}}</text>
                </div>
                <div style="height:100px;flex:1;">
                    <wxc-button v-if="!isEditCart" text="下单" :btn-style="btnStyle" type="red" @wxcButtonClicked="checkoutOrder"></wxc-button>
                    <wxc-button v-else text="删除所选" :btn-style="btnStyle" type="red" @wxcButtonClicked="checkoutOrder"></wxc-button>
                </div>
            </div>
         </scroller>
        </div>
    </div>
</template>
<script>
// import he from '../utils/he';
import { WxcIcon,Utils,WxcButton} from 'weex-ui'
import Config from '../common/config'
import app from '../app.js'
// Vue.filter('myFilter', function(value) {
//     return he.decode(value);
// })

export default {
    components: { WxcIcon,WxcButton},
    mounted() {
        this.getCartList();
    },
    data() {
        return {
            cartGoods:[],
            cartTotal:{},
            tabStyles: Config.tabStyles,
            jsessionid:'',
            isEditCart:false,
            checkedAllStatus:true,

        }
    },
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height)-66-150 + 'px' };
      this.scroStyle = { height: (tabPageHeight - tabStyles.height)-66 + 'px' };
      this.jsessionid = app.globalData.userInfo.jsessionid;
    },
    computed:{
        btnStyle(){
            const  customStyle = {height:'100px',width:'140px',backgroundColor:'red'};
            return customStyle;
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
        },
        checkedItem(index){
            var that = this;
            if(!this.isEditCart){
                this.$fetch({
                method: 'POST',    
                url: 'https://www.qingqinkj.com/api/mall/mall/user/userCart/checked?jsessionid='+that.jsessionid,
                data: {
                    id: that.cartGoods[index].id,
                    isChecked: that.cartGoods[index].checked=="1" ? "0" : "1"
                }
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                }
            }, error => {
                // 错误回调
                //console.log(error)
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
            })
            }else{

            }
            //检验全选
            this.checkedAllStatus = this.isCheckedAll();
        },
        isCheckedAll(){
            var flag = true;
            this.cartGoods.forEach(i=>{
                if(i.checked=='0'){
                    flag = false;
                }
            });
            return flag;

        },
        checkedAll(){
            let that = this;
            if(!this.isEditCart){
                var productIds = this.cartGoods.map(function (v) {
                    return v.productId;
                });
                this.$fetch({
                method: 'POST',    
                url: 'https://www.qingqinkj.com/api/mall/mall/user/userCart/checked?jsessionid='+that.jsessionid,
                data: {
                    productIds: productIds.join(','),
                    isChecked: that.isCheckedAll() ? 0 : 1
                }
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                }
                this.checkedAllStatus= that.isCheckedAll();
                console.log(res);
            }, error => {
                // 错误回调
                //console.log(error)
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
            })
            }else{
                //编辑状态
            }
        },
        checkoutOrder(){

        }

    }
}
</script>
<style lang="sass" src="./cart.scss" scoped></style>