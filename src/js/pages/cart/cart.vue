<template>
    <div class="wrapper">
        <div class="slogan">
          <div class="head-box pub-layout">
              <image class="head-image" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"></image>
              <text class="i-slg">30天无忧退换货</text>
          </div>
          <div class="head-box pub-layout">
              <image class="head-image" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png"></image>
              <text class="i-slg">48小时快速退款</text>
          </div>
          <div class="head-box pub-layout">
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
                            <text class="cartGood-center-font" style="height: 35px;overflow:hidden;">{{item.goodsName}}</text>
                            <text class="cartGood-center-font">{{item.goodsSpecifitionNameValue}}</text>
                            <text class="cartGood-center-font">￥{{item.retailPrice}}</text>
                        </div>
                    </div>
                    <div style="flex:2;justify-content: center;" class="pub-layout-two">
                        <text v-if="!isEditCart" class="cartGood-center-font">x{{item.numbers}}</text>
                        <stepper v-else step="1" :default-value="item.numbers" min="1" :read-only="true"
                            @wxcStepperValueCutNumber="cutNumber(index)" @wxcStepperValueAddNumber="addNumber(index)"></stepper>
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
                <div style="height:100px;flex:0.7;" class="cart-bottom-layout pub-layout" @click="editCart()">
                    <text>{{!isEditCart?'编辑':'完成'}}</text>
                </div>
                <div style="height:100px;flex:1.5;">
                    <wxc-button v-if="!isEditCart" text="下单" :btn-style="btnStyle" type="red" @wxcButtonClicked="checkoutOrder"></wxc-button>
                    <wxc-button v-else text="删除所选" :btn-style="btnStyle" type="red" @wxcButtonClicked="deleteCart"></wxc-button>
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
import stepper from './stepper.vue'
import apis from '../../config/url.apis';
// Vue.filter('myFilter', function(value) {
//     return he.decode(value);
// })

export default {
    components: { WxcIcon,WxcButton,stepper },
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
            cartTotal: {
                goodsCount: 0,
                goodsAmount: 0.00,
                checkedGoodsCount: 0,
                checkedGoodsAmount: 0.00
                },
            editCartList:[]

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
            const  customStyle = {height:'100px',width:'200px',backgroundColor:'red'};
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
                url: apis.CartList,
                data: {
                    jsessionid: that.jsessionid,
                }
            }).then(res =>{
                if (res.tips.isOk) {
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                 this.checkedAllStatus=this.isCheckedAll()
                }
            },error => {
                this.$notice.alert({
                    title: "查询失败",
                    message: '消息',
                    okTitle: '确认',
                    callback(){
                    }
                })
            })
            
        },
        checkedItem(itemIndex){
            var that = this;
            if(!this.isEditCart){
                this.$fetch({
                method: 'POST',    
                url: apis.CartChecked+'?jsessionid='+that.jsessionid,
                data: {
                    id: that.cartGoods[itemIndex].id,
                    isChecked: that.cartGoods[itemIndex].checked=="1" ? "0" : "1"
                }
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                }
                this.checkedAllStatus = this.isCheckedAll();
            }, error =>{
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
                this.checkedAllStatus = this.isCheckedAll();
            })
            }else{
                let tmpCartData = this.cartGoods.map(function (element, index, array) {
                if (index == itemIndex){
                var flag='0';
                if (element.checked=='0'){
                    flag='1';
                }
                element.checked = flag;
                }
                return element;
            });
                this.cartGoods=tmpCartData,
                this.checkedAllStatus=this.isCheckedAll(),
                this.cartTotal.checkedGoodsCount=this.getCheckedGoodsCount()
            }    
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
                url: apis.CartChecked+'?jsessionid='+that.jsessionid,
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
            }, error => {
                // 错误回调
               
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
                this.checkedAllStatus= that.isCheckedAll();
            })
            }else{
                //编辑状态
                let checkedAllStatus = this.isCheckedAll();
                let tmpCartData = this.cartGoods.map(function (v) {
                    var flag=0;
                    if (!checkedAllStatus){
                    flag=1;
                    }
                    v.checked = flag;
                    return v;
                });

                    this.cartGoods=tmpCartData,
                    this.checkedAllStatus=this.isCheckedAll(),
                    this.cartTotal.checkedGoodsCount=this.getCheckedGoodsCount()
            }
        },
        editCart: function () {
            var that = this;
            if (this.isEditCart) {
                this.getCartList();
                this.isEditCart=!this.isEditCart
            }else {
                let tmpCartList = this.cartGoods.map(function (v) {
                    v.checked = '0';
                    return v;
                });
                this.editCartList= this.cartGoods;
                this.cartGoods= tmpCartList;
                this.isEditCart= !this.isEditCart;
                this.checkedAllStatus= that.isCheckedAll();
                this.cartTotal.checkedGoodsCount= that.getCheckedGoodsCount();
                }
        },
        getCheckedGoodsCount: function(){
            let checkedGoodsCount = 0;
            this.cartGoods.forEach(function (v) {
            if (v.checked =='1') {
                checkedGoodsCount += v.numbers;
            }
            });
            return checkedGoodsCount;
        },
        checkoutOrder(){
            //获取已选择的商品
            let that = this;

            var checkedGoods = this.cartGoods.filter(function (element, index, array) {
            if (element.checked =='1') {
                return true;
            } else {
                return false;
            }
            });

            if (checkedGoods.length <= 0) {
            return false;
            }
            this.$router.open({
                name: 'pages.cart.checkout',
                navShow : false,
            })

        },
        deleteCart(){
            //获取已选择的商品
            let that = this;

            let ids = this.cartGoods.filter(function (element, index, array) {
            if (element.checked == '1') {
                return true;
            } else {
                return false;
            }
            });

            if (ids.length <= 0) {
                this.$notice.toast({
                    message: '请点击按钮选择删除'
                })
            return false;
            }

            ids = ids.map(function (element, index, array) {
            if (element.checked == '1') {
                return element.id;
            }
            });
             this.$fetch({
                method: 'POST',    
                url: apis.CartDelete+'?jsessionid='+that.jsessionid,
                data: ids
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                    console.log("456456");
                    console.log(res);
                    if(!!res.data){
                     let cartList = res.data.cartList.map(v => {
                        v.checked = '0';
                        return v;
                        });
                        this.cartGoods=cartList;
                        this.cartTotal=res.data.cartTotal;
                        
                        this.$notice.toast({
                            message: '删除成功'
                        })
                    }else{
                        this.cartGoods=[];
                        this.cartTotal={};
                        this.$notice.toast({
                            message: '删除成功'
                        })
                    }
                }
                this.checkedAllStatus= that.isCheckedAll();
            }, error => {
                // 错误回调
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
                this.checkedAllStatus= that.isCheckedAll();
            })
        },
        cutNumber(index){
            let cartItem = this.cartGoods[index];
            let numbers = (cartItem.numbers - 1 > 1) ? cartItem.numbers - 1 : 1;
            cartItem.numbers = numbers;
            this.cartGoods= this.cartGoods;
            this.updateCart(cartItem.productId, cartItem.goodsId, numbers, cartItem.id);
        },
        addNumber(index){
            let cartItem = this.cartGoods[index];
            let numbers = cartItem.numbers + 1;
            cartItem.numbers = numbers;
            this.cartGoods=this.cartGoods;
            this.updateCart(cartItem.productId, cartItem.goodsId, numbers, cartItem.id);
        },
        updateCart: function (productId, goodsId, numbers, id) {
            let that = this;

            this.$fetch({
                method: 'POST',    
                url: apis.CartUpdate+'?jsessionid='+that.jsessionid,
                data: {
                    productId: productId,
                    goodsId: goodsId,
                    numbers: numbers,
                    id: id
                }
            }).then(res => {
                // 成功回调
                if (res.tips.isOk) {
                    console.log("成功了");
                    console.log(res);
                }
                this.checkedAllStatus= that.isCheckedAll();
            }, error => {
                // 错误回调
               
                this.$notice.alert({
                    title: "失败",
                    message: '消息',
                    okTitle: '确认',
                    callback() {
                        // 点击确认按钮的回调
                    }
                })
            })
        },

    }
}
</script>
<style lang="sass" src="./cart.scss" scoped></style>