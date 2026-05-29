import {createApp} from 'vue'
import router from "./router";
import './style.css'
import './animation.css'
import './utlis/setSiteTitleIcons.ts'
// import ToastPlugin from './utlis/ToastPlugin.ts' // 👈 引入

import App from './App.vue'

const app = createApp(App);

// app.use(ToastPlugin)

app.use(router).mount('#app')


