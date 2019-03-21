import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    // 滚动条, 滚动高度
    scrollbarHeight: 0,
    // 容器, 居中
    wrapperCenter: false,
    // 头部, 皮肤 (white 白色 / colorful 鲜艳)
    headerSkin: 'colorful',
    // 头部, 固定状态
    headerFixed: false,
    // 侧边, 皮肤 (white 白色 / dark 黑色)
    asideSkin: 'dark',
    // 侧边, 固定状态
    asideFixed: false,
    // 侧边, 折叠状态
    asideFold: false,
    // 侧边, 至头部状态
    asideTop: false,
    // 侧边, 菜单显示状态 (控制台“至头部”操作时, el-menu组件需根据mode属性重新渲染)
    asideMenuVisible: true,
    // 侧边, 菜单选中
    asideMenuActive: 'home',
    // 控制台, 固定状态
    controlFixed: false,
    // 控制台, 打开状态
    controlOpen: true,
    // 控制台, 标签页选中
    controlTabsActive: 'layout',
    // 主内容, 展示类型 (standard 标准 / tabs 标签页)
    mainType: 'standard', 
    // 主标签页, 列表
    mainTabs: [],
    // 主标签页, 选中
    mainTabsActive: 'home',
    // 主标签页, 头部固定状态
    mainTabsHeaderFixed: false,
    // 导航条, 布局风格, defalut(白色) / colorful(鲜艳)
    navbarLayoutType: 'colorful',
    // 侧边栏, 布局皮肤, default(白色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    sidebarMenuList: [],
    sidebarMenuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 内容, 标签页(默认添加首页)
    contentTabs: [
      {
        ...window.APP_CONFIG['contentTabDefault'],
        'name': 'home',
        'title': 'home'
      }
    ],
    contentTabsActiveName: 'home'
  },
  modules: {
    user
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.APP_CONFIG['storeState'][key])
      })
    }
  }
})
