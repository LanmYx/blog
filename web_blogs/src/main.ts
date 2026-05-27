import {createApp} from 'vue'
import router from "./router";
import './style.css'
import './animation.css'
import './utlis/setSiteTitleIcons.ts'

import App from './App.vue'

const app = createApp(App);

app.use(router).mount('#app')


