
export default {

    // 正常模式的tab title配置
    tabTitles: [
      {
        title: '首页',
        icon: 'bmlocal://assets/images/ic_menu_choice_nor.png',
        activeIcon: 'bmlocal://assets/images/ic_menu_choice_pressed.png'
      },
      {
        title: '分类',
        icon: 'bmlocal://assets/images/ic_menu_sort_nor.png',
        activeIcon: 'bmlocal://assets/images/ic_menu_sort_pressed.png'
      },
      {
        title: '购物车',
        icon: 'bmlocal://assets/images/ic_menu_shoping_nor.png',
        activeIcon: 'bmlocal://assets/images/ic_menu_shoping_pressed.png',
      },
      {
        title: '我的',
        icon: 'bmlocal://assets/images/ic_menu_me_nor.png',
        activeIcon: 'bmlocal://assets/images/ic_menu_me_pressed.png',
      }
    ],
    tabStyles: {
      bgColor: '#FFFFFF',
      titleColor: '#666666',
      activeTitleColor: '#b4282d',
      activeBgColor: '#FFFFFF',
      isActiveTitleBold: true,
      iconWidth: 70,
      iconHeight: 70,
      width: 160,
      height: 120,
      fontSize: 24,
      textPaddingLeft: 10,
      textPaddingRight: 10
    },
  
    // 使用 iconFont 模式的tab title配置
    tabIconFontTitles: [
      {
        title: '首页',
        codePoint: '\ue623'
      },
      {
        title: '分类',
        codePoint: '\ue608'
      },
      {
        title: '购物车',
        codePoint: '\ue752',
        badge: 5
      },
      {
        title: '我的',
        codePoint: '\ue601',
        dot: true
      }
    ],
    tabIconFontStyles: {
      bgColor: '#FFFFFF',
      titleColor: '#666666',
      activeTitleColor: '#3D3D3D',
      activeBgColor: '#FFFFFF',
      isActiveTitleBold: true,
      width: 160,
      height: 120,
      fontSize: 24,
      textPaddingLeft: 10,
      textPaddingRight: 10,
      iconFontSize: 50,
      iconFontMarginBottom: 8,
      iconFontColor: '#333333',
      activeIconFontColor: 'red',
      iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
    },
    title:"德多多购"
  }