// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始

export default {
    'eros': {
        title: 'eros',
        url: '/pages/index.js'
    },
    'pages.main' : {
        title: 'main',
        url: '/pages/main.js'
    },
    'pages.cart.checkout' : {
        url: '/pages/cart/checkout/checkout.js',
    },
    'pages.home.channels' : {
        url: '/pages/home/channels/channels.js',
    },
    'pages.home.brandDetail' : {
        url: '/pages/home/brandDetail/brandDetail.js',
    },
    'pages.home.goods' : {
        url: '/pages/home/goods/goods.js',
    },
    'pages.home.goodsDetail' : {
        url: '/pages/home/goods/goodsDetail.js',
    },
    'pages.home.checkout' : {
        url: '/pages/home/goods/checkout.js',
    },
    'pages.home.good.comment' : {
        url: '/pages/home/goods/comment.js',
    },
    'pages.home.good.address' : {
        url: '/pages/home/goods/address.js',
    },
    'pages.home.good.useTicket' : {
        url: '/pages/home/goods/useTicket.js',
    },
    'pages.home.good.addressAdd' : {
        url: '/pages/home/goods/addressAdd.js',
    },
    'pages.home.good.amap':{
        url: '/pages/home/goods/aMap.js',
    }
    
}
