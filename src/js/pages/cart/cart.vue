<template>
    <div class="wrapper">
        <three-tag></three-tag>
        <div v-if="cartGoods.length<=0" class="noshop-layout" :style="contentStyle" @click="gototest">
            <image class="noshop-image" resize="stretch" src="bmlocal://assets/images/goodcart.png"></image>
            <text style="text-align:center;color:#999">去添加点什么吧</text>
        </div>

        <div v-if="cartGoods.length>0">
         <scroller class="scroller" :style="scroStyle" >
            <div> 
                <div v-for="(item,index) in cartGoods" class="cartGood-layout pub-layout">
                    <div style="flex:7" class="cart-bottom-layout pub-layout" @click="checkedItem(index)">
                    <image v-if="item.checked=='1'" class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-t.png"></image>
                    <image v-else class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-f.png"></image>
                        
                    </div>
                    <div style="flex:40;" class="pub-layout">
                        <div style="flex:1;" class="cartGood-center pub-layout">
                            <image class="cartGood-image" resize="stretch" :src="item.listPicUrl"></image>
                        </div>
                        <div style="flex:3;justify-content: center;padding-left:12px;" class="pub-layout-two">
                            <text class="cartGood-center-font" style="height: 35px;overflow:hidden;">{{item.goodsName}}</text>
                            <text class="cartGood-center-font">{{item.goodsSpecifitionNameValue}}</text>
                            <text class="cartGood-center-font">￥{{item.retailPrice}}</text>
                        </div>
                    </div>
                    <div style="flex:20;justify-content: center;" class="pub-layout-two">
                        <text v-if="!isEditCart" class="cartGood-center-font">x{{item.numbers}}</text>
                        <stepper v-else :value="item"  min="1"
                             @wxcStepperValueCutNumber="cutNumber" @wxcStepperValueChanged="numbersChange" @wxcStepperValueAddNumber="addNumber"></stepper>
                    </div>
                </div>
            </div>
            <div class="cart-bottom pub-layout">
                <div style="height:100px;flex:15;" class="cart-bottom-layout pub-layout" @click="checkedAll()">
                    <image v-if="checkedAllStatus" class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-t.png"></image>
                    <image v-else class="checkboxsize" resize="stretch" src="bmlocal://assets/images/checkbox-f.png"></image>             
                    <text class="hidden-text">全选({{checkedAllStatus?cartTotal.checkedGoodsCount:0}})</text>
                </div>
                <div style="height:100px;flex:18;" class="cart-bottom-layout-two pub-layout">
                    <text class="hidden-text" style="width: 200px;">{{'￥'+cartTotal.checkedGoodsAmount}}</text>
                </div>
                <div style="height:100px;flex:7;" class="cart-bottom-layout pub-layout" @click="editCart()">
                    <text>{{!isEditCart?'编辑':'完成'}}</text>
                </div>
                <div style="height:100px;flex:15;">
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
import ThreeTag from '../components/ThreeTag.vue'
// Vue.filter('myFilter', function(value) {
//     return he.decode(value);
// })

export default {
    components: {WxcIcon,WxcButton,stepper,ThreeTag},
    mounted() {
        this.getCartList();
    },
    data() {
        return {
            cartGoods:[],
            tabStyles:Config.tabStyles,
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
                 res.data.cartList.forEach(i=>i.totalPrice=(i.numbers*i.retailPrice).toFixed(2));
                 this.cartGoods=res.data.cartList;
                 this.cartTotal=res.data.cartTotal;
                 this.checkedAllStatus=this.isCheckedAll();
                }
            },error => {
                this.checkedAllStatus=this.isCheckedAll();
            })
        },
        checkedItem(itemIndex){
            var that = this;
            let cartItemId = that.cartGoods[itemIndex].id
            let isChecked = that.cartGoods[itemIndex].checked == "1" ? "0" : "1" 
        
            that.cartGoods.forEach(item => {
                if (item.id == cartItemId) {
                item.checked = isChecked
                }
            })
                this.cartGoods=that.cartGoods;
                this.checkedAllStatus=that.isCheckedAll();
                this.cartTotal=that.getCheckedGoodsCountAndAmount();   
        },
        getCheckedGoodsCountAndAmount: function(){ 
            let cartTotal={
            checkedGoodsCount: 0,
            checkedGoodsAmount: 0.00
            }
            this.cartGoods.forEach(function (v) {
                if (v.checked =='1') {
                    cartTotal.checkedGoodsCount += v.numbers;
                    cartTotal.checkedGoodsAmount += v.numbers * v.retailPrice;
                }
            })
            return cartTotal;
        },
        isCheckedAll() {
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
            let checkedAllStatus = that.isCheckedAll();
            if (this.isEditCart==false) {
            that.cartGoods.forEach(function (v) {
                v.checked = !checkedAllStatus
            });
            this.cartGoods=that.cartGoods;
            this.checkedAllStatus=!checkedAllStatus;
            this.cartTotal=that.getCheckedGoodsCountAndAmount();
            } else {
            //编辑状态 
                that.cartGoods.map(function (v) {
                    v.checked = !checkedAllStatus
                }); 
                this.cartGoods=that.cartGoods;
                this.checkedAllStatus=!checkedAllStatus;
                this.cartTotal=that.getCheckedGoodsCountAndAmount();
            }
        },
        editCart: function () {
            var that = this;
            if(this.isEditCart) {
                this.isEditCart=!this.isEditCart;
            }else {
                this.$fetch({
                method: 'POST',    
                url: apis.CartBatchUpdate+'?jsessionid='+that.jsessionid,
                data: that.cartGoods
                }).then(res =>{
                    if (res.tips.isOk) {
                        this.isEditCart=false
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
            }
        },
        checkoutOrder() {
            //获取已选择的商品
            let that =this;
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
            this.$fetch({
                method: 'POST',    
                url: apis.CartBatchChecked+'?jsessionid='+that.jsessionid,
                data: cartItems
                }).then(res =>{
                    if (res.tips.isOk) {
                        this.$router.open({
                            name: 'pages.cart.checkout',
                            navShow : false,
                        })
                    }
                },error => {
                    this.$notice.toast({
                        message: '更新购物车出错'
                    })
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
            let notCheckedItems = this.cartGoods.filter(item=>{
                return item.checked=='0'
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
            }).then(res =>{
                // 成功回调
                if (res.tips.isOk) {
                     this.cartGoods=notCheckedItems;
                     this.checkedAllStatus=that.isCheckedAll();
                     this.cartTotal=that.getCheckedGoodsCountAndAmount();
                }
            }, error =>{
                this.$notice.toast({
                message: '出错'
            })
            })
        },
        cutNumber(item){
            //item从子组件中传过来的
            // let cartItem = this.cartGoods[index];
            // let numbers = (cartItem.numbers - 1 > 1) ? cartItem.numbers - 1 : 1;
            this.updateCart(item.productId, item.goodsId, item.numbers, item.id);
        },
        numbersChange: function (item) {
            // let cartItem = this.cartGoods[itemIndex];
            // let numbers=0;
            // if (event.detail.value==''){
            // numbers=0
            // }else{
            // numbers = parseInt(event.detail.value)
            // } 
            // this.updateCart(cartItem.productId, cartItem.goodsId, numbers, cartItem.id);
            this.updateCart(item.productId, item.goodsId, item.numbers, item.id);
        },
        addNumber(item){
            //let cartItem = this.cartGoods[index];
            //let numbers = cartItem.numbers + 1;
            this.updateCart(item.productId, item.goodsId, item.numbers, item.id);
        },
        updateCart: function (productId, goodsId, numbers, id) {
            let that = this;
            let hasGoodsNumber=false;
            that.cartGoods.forEach(item => {
            if (item.id == id) { 
                if (item.orginGoodsNumber){  
                hasGoodsNumber=true
                if (((item.goodsNumber >= (item.orginGoodsNumber - numbers)) && numbers <= item.orginGoodsNumber)||numbers<=item.numbers){
                    item.goodsNumber = item.orginGoodsNumber - numbers
                    item.numbers = numbers
                    item.totalPrice = (item.numbers * item.retailPrice).toFixed(2)
                }
                } 
            }
            })
            if (hasGoodsNumber==true){
                    this.cartGoods=that.cartGoods;
                    this.checkedAllStatus=that.isCheckedAll();
                    this.cartTotal=that.getCheckedGoodsCountAndAmount();
            }else{
                this.$fetch({
                    method: 'GET',    
                    url: apis.CheckSku+'?jsessionid='+that.jsessionid,
                    data: {
                        productId: productId
                    }
                }).then(res => {
                    // 成功回调
                    if (res.tips.isOk) {
                        that.cartGoods.forEach(item => {
                            if (item.productId == productId) {
                            item.goodsNumber = res.data
                            item.orginGoodsNumber = res.data
                            if (((item.goodsNumber >= (item.orginGoodsNumber - numbers)) && numbers <= item.orginGoodsNumber) || numbers <= item.numbers) {
                                item.goodsNumber = item.orginGoodsNumber - numbers
                                item.numbers = numbers
                                item.totalPrice = (item.numbers * item.retailPrice).toFixed(2)
                            }
                            }
                        })
                        this.cartGoods=that.cartGoods;
                        this.checkedAllStatus=that.isCheckedAll();
                        this.cartTotal=that.getCheckedGoodsCountAndAmount();
                    }
                }, error => {
                    this.$notice.toast({
                        message: '查库存出错'
                    })
                })
            }
        },
        gototest(){
            this.$router.open({
                            name: 'pages.cart.checkout',
                            navShow : false,
                        })
        }

    }
}
</script>
<style lang="sass" src="./cart.scss" scoped></style>