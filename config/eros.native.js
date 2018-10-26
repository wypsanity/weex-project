module.exports = {
    'appName': 'eros-test',
    'appBoard': '/config/index.js',
    // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
    'androidIsListenHomeBack': 'true',
    'customBundleUpdate': 'false',
    'version': {
        'android': '1.0.0',
        'iOS': '1.0.0'
    },
    'page': {
        'homePage': '/pages/index.js',
        'mediatorPage': '/mediator/index.js',
        'navBarColor': '#1DA1F2',
        'navItemColor': '#ffffff'
    },
    'url': {
        'image': 'https://lev-inf.benmu-health.com/test/xxx',
        'bundleUpdate': 'http://localhosts:3001/app/check'
    },
    'zipFolder': {
        'iOS': '/ios/WeexEros/WeexEros',
        'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
    },
    'getui': {
        'enabled': 'false',
        'appId': '',
        'appKey': '',
        'appSecret': ''
    },
    'tabBar': {
        'color': '#666666',
        'selectedColor': '#b4282d',
        'backgroundColor': '#fafafa',
        'borderColor': '#ffffff',
        'list': [{
                'pagePath': '/pages/home/home.js',
                'text': '首页',
                'icon': 'bmlocal://assets/images/ic_menu_choice_nor.png',
                'selectedIcon': 'bmlocal://assets/images/ic_menu_choice_pressed.png',
                'navShow': 'true',
                'navTitle': '首页'
            },
            {
                'pagePath': '/pages/catelog/catelog.js',
                'text': '分类',
                'icon': 'bmlocal://assets/images/ic_menu_sort_nor.png',
                'selectedIcon': 'bmlocal://assets/images/ic_menu_sort_pressed.png',
                'navShow': 'true',
                'navTitle': '分类'
            },
            {
                'pagePath': '/pages/cart/cart.js',
                'text': '购物车',
                'icon': 'bmlocal://assets/images/ic_menu_shoping_nor.png',
                'selectedIcon': 'bmlocal://assets/images/ic_menu_shoping_pressed.png',
                'navShow': 'false',
                'navTitle': '购物车'
            },
            {
                'pagePath': '/pages/my/my.js',
                'text': '我的',
                'icon': 'bmlocal://assets/images/ic_menu_me_nor.png',
                'selectedIcon': 'bmlocal://assets/images/ic_menu_me_pressed.png',
                'navShow': 'false',
                'navTitle': '我的'
            },
        ]
    }
}