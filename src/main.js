// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import Aria2Manager from '@/utils/aria2manager'

import App from './App'
import router from './router'

/*
  aria2
*/
let aria2manager = new Aria2Manager()
aria2manager.setSyncInterval(1000)

/*
  Vue
*/
Vue.config.productionTip = false
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
aria2manager.onBtDownloadComplete = (tasks, serverName, serverIndex) => completeSound.play()
aria2manager.onDownloadComplete = (tasks, serverName, serverIndex) => {
  if (tasks.some(task => !task.isBT)) completeSound.play()
}
aria2manager.onDownloadError = (tasks, serverName, serverIndex) => errorSound.play()
