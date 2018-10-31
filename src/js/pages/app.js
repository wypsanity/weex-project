export default {
    navList:{},
    globalData: {
        authId:'r89bb6397',//德多多小程序   
        authType: 'noauth', //reject 拒绝授权 /accept 同意 / noauth 未授权
        userInfo: {
          userTpa:{
            openid:'',
            authId:'',
            unionid:'',
            nickname:'',
            headimgurl:'',
            city:'' 
          }, 
          userid:'',
          jsessionid: "b6140d29-d997-4dd7-b614-8421bc9f6886",
          nickName: "",
          headimgurl: "",
          sex: "", //性别 0：未知、1：男、2：女
          province: "",
          city: "",
          country: "",
          displayUserid: "",//用于客户登录、展示的客户账号
          displayDeptid: "", //用于展示的客户所属部门编号
          shortName: "",//部门简称
          deptName: "",//部门全称
          phoneno: ""
        },
        orderGoods:[],//订单商品
        orderInfo:{},//订单信息
        orderCardInfo:{},//订单使用卡券信息。
        locationCardInfo:{},//门店支付使用卡劵信息
        buyItNowInfo:{},//立即下单的信息
        kaituanInfo:{},//开团订单信息
        kaituanGoods: {},//开团订单商品信息
        cantuanInfo:{},//参团信息
        addressInfo:{},//地址信息
        commentGoodsList:[]//某订单中待评价的商品列表
      },
      indexData:{//首页加载后的数据 
        newGoodss: [],//res.newGoodsList,
        hotGoodss: [],//res.hotGoodsList,
        topics: [],//res.topicList,
        brands: [],//res.brandList,
        categoryGoodss: [],//res.categoryList,
        banners: [],//res.banner,
        channels: [],//res.channel,
        categoryTree:{},//分类树
      },
      getUserInfo: function () {
        return this.globalData.userInfo;
      },
      getAuthId : function(){
        return this.globalData.authId;
      },
}