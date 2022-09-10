import { createApp,provide,h } from 'vue'
import { createPinia } from 'pinia'

import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apolloClient';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp({
    setup() {
        provide(DefaultApolloClient,apolloClient);
    }, 
    render:()=>h(App),
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
