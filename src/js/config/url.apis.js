var NewApiRootUrl = 'https://www.qingqinkj.com/api/mall/mall/';
var WebApiRootUrl = 'https://www.qingqinkj.com/api/wxpub/wxpub/';
var MkApiRootUrl = 'https://www.qingqinkj.com/api/mk/mk/';
var ArcApiRootUrl = 'https://www.qingqinkj.com/api/arc/arc/';
export default {
    'CatalogList': NewApiRootUrl+'pub/category/index',  //分类目录全部分类数据接口（√） 
    CartList: NewApiRootUrl + 'user/userCart/getCart', //获取购物车的数据(√)
    CartChecked: NewApiRootUrl + 'user/userCart/checked', // 选择或取消选择商品(√)
    CartDelete: NewApiRootUrl + 'user/userCart/deleteCart', // 删除购物车的商品(√)
    CartUpdate: NewApiRootUrl + 'user/userCart/updateCart', // 更新购物车的商品(√)
    IndexUrl: NewApiRootUrl + 'goods/goods/getIndexInfo', //首页数据接口（√）
}
