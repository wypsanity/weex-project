var NewApiRootUrl = 'https://www.qingqinkj.com/api/mall/mall/';

var MallApiRootUrl = 'https://www.qingqinkj.com/api/mall/mall/';
var WxpubApiRootUrl = 'https://www.qingqinkj.com/api/wxpub/wxpub/';
var MkApiRootUrl = 'https://www.qingqinkj.com/api/mk/mk/';
var ArcApiRootUrl = 'https://www.qingqinkj.com/api/arc/arc/';
export default{
    IndexBanners:MallApiRootUrl + 'pub/ad/list', //首页轮播图广告数据接口（√）
    IndexChannels: MallApiRootUrl + 'pub/channel/list', //首页频道数据接口（√）
    IndexBrands: MallApiRootUrl + 'pub/brand/list', //首页品牌商数据接口（√）
    IndexNewGoodss: MallApiRootUrl + 'goods/goods/list/new', //首页新产品接口（√）
    IndexHotGoodss: MallApiRootUrl + 'goods/goods/list/hot', //首页热销产品接口（√）
    IndexCategoryGoodss: MallApiRootUrl + 'goods/goods/list/categoryGoodss', //首页分类产品接口（√）
    showLocation: MallApiRootUrl + 'shop/shopLocation/indexData',//门店列表(√)
    CatalogList: MallApiRootUrl + 'pub/category/index',  //分类目录全部分类数据接口（√）  
    CartBatchUpdate: MallApiRootUrl + 'user/userCart/batchUpdate', // 批量更新购物车的商品(√)
    CartList: MallApiRootUrl + 'user/userCart/getCart', //获取购物车的数据(√)
    CartBatchChecked: MallApiRootUrl + 'user/userCart/batchChecked', // 选择或取消选择商品(√)
    CartDelete: MallApiRootUrl + 'user/userCart/deleteCart', // 删除购物车的商品(√)
    CheckSku: MallApiRootUrl + 'stk/productStock/checkSku', // 查询产品库存(√)
    GoodsList: MallApiRootUrl + 'goods/goods/getGoodsList',  //获得商品列表（√） 
    BrandDetail: MallApiRootUrl + 'pub/brand/list',  //品牌详情（√） 
    GoodsGallerys: MallApiRootUrl + 'goods/gallery/list/byGoodsId',  //获得商品的相册（√） 
    GoodsComments: MallApiRootUrl + 'goods/comment/list/byGoodsId',  //获得商品的评论（√）
    GoodsAttributes: MallApiRootUrl + 'goods/attribute/list/byGoodsId',  //获得商品的属性（√）  
    GoodsInfo: MallApiRootUrl + 'goods/goods/one',  //获得商品的基本信息（√） 
    GoodsIssues: MallApiRootUrl + 'goods/issue/list/byGoodsId',  //获得商品的常见问题（√）
    IndexTopics: MallApiRootUrl + 'pub/topic/list', //首页专题接口（√）
    GoodsSpecifications: MallApiRootUrl + 'goods/specification/list/byGoodsId',  //获得商品的规格（√）
    CartGoodsCount: MallApiRootUrl + 'user/userCart/goodsCount', // 获取购物车商品件数(√)
    CartAdd: MallApiRootUrl + 'user/userCart/add', // 添加商品到购物车(√)
    CommentCount: MallApiRootUrl + 'goods/comment/count',  //评论总数(√)
    CommentList: MallApiRootUrl + 'goods/comment/getCommentList',  //评论列表(√)
    CollectAddOrDelete: MallApiRootUrl + 'user/userCollect/addOrDelete',  //添加或取消收藏(√)
    GetAddressAndPrice: MallApiRootUrl + 'user/userAddress/getAddressAndPrice',  //获取默认收货地址及运费
    GetUserActiveCard: WxpubApiRootUrl + 'card/userReceive/getUserActiveCard',  //获取用户所拥有的卡券
    CartCheckout: MallApiRootUrl + 'user/userCart/checkedOut', // 下单前信息确认(√)
    AddressList: MallApiRootUrl + 'user/userAddress/list',  //收货地址列表(√)
}
