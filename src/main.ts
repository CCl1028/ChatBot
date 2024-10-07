import { createApp } from 'vue'
// 下面这个是vue3自带的样式
// import './style.css'
import App from '@/App.vue'
// import router from '@/router'
// 清除默认样式
// import './index.css'

// 引入ElementPlus
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'

// vuex的引入
import store from './store'

// 引入 Echarts
// import echarts from 'echarts'

// App.prototype.$echarts = echarts 

// createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
createApp(App).use(ElementPlus).use(store).mount('#app')
