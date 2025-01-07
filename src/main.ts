import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});

createApp(App).use(vuetify).mount('#app');
