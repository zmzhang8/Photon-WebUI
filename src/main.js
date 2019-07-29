import Vue from 'vue'
import VueI18n from 'vue-i18n'
import router from './router'
import App from './App.vue'

import Aria2Manager from '@/utils/aria2manager'

/*
  Vue
*/
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.use(VueI18n)
const messages = {
  'en-US': { message: require('@/lang/en-US.json') },
  'zh-CN': { message: require('@/lang/zh-CN.json') }
}
const i18n = new VueI18n({
  locale: navigator.language,
  fallbackLocale: 'en-US',
  messages
})

/*
  aria2
*/
let aria2manager = new Aria2Manager()
aria2manager.setSyncInterval(1000)

new Vue({
  components: { App },
  router,
  i18n,
  template: '<App :manager="manager"></App>',
  data: {
    manager: aria2manager
  }
}).$mount('#app')

/*
  WebUI
*/
let completeSound = new Audio(require('@/assets/complete.mp3'))
let errorSound = new Audio(require('@/assets/error.mp3'))
aria2manager.onBtDownloadComplete = () => completeSound.play()
aria2manager.onDownloadComplete = (tasks) => {
  if (tasks.some(task => !task.isBT)) completeSound.play()
}
aria2manager.onDownloadError = () => errorSound.play()
