import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Vuetify
import 'vuetify/styles'

//toastification
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  position: POSITION.BOTTOM_RIGHT,
  draggable: false,
  timeout: 3000,
};

const pinia = createPinia();
const app = createApp(App)

pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(Toast, options);

app.mount('#app')


