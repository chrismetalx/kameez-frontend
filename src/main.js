import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Vuetify
import 'vuetify/styles'

// toastify
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

//toastification
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  position: POSITION.BOTTOM_RIGHT,
  draggable: false,
  timeout: 3000,
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Vue3Toastify)

app.use(Toast, options);

app.mount('#app')


