// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    'eslint': false,
    'webpackWarnings': false,
    'exports': [
        // appBoard
        'js/config/index.js',
        // mediator
        'js/mediator/index.vue',
        // home
        'js/pages/index.vue',
        'js/pages/main.vue',
        'js/pages/cart/cart.vue',
        'js/pages/catelog/catelog.vue',
        'js/pages/home/home.vue',
        'js/pages/my/my.vue',
        'js/pages/cart/checkout/checkout.vue',
        'js/pages/home/channels/channels.vue',
        'js/pages/home/brandDetail/brandDetail.vue',
        'js/pages/home/goods/goods.vue',
        'js/pages/home/goods/goodsDetail.vue',
    ],
    'alias': {
        'Components': 'js/components',
        'Common': 'js/common',
        'Config': 'js/config',
        'Widget': 'js/widget',
        'Pages': 'js/pages',
        'Utils': 'js/utils'
    },
    'diff': {
        'pwd': '/Users/yangmingzhe/Work/opensource/eros-diff-folder',
        'proxy': 'https://app.weex-eros.com/source'
    },
    'server': {
        'path': './',
        'port': 8889
    },
    'mockServer': {
        'port': 52077,
        'mockDir': './dist/mock'
    },
    'socketServer': {
        'port': 8890,
        'switch': true
    }
}
