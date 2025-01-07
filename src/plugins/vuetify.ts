import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#212529',
          surface: '#1c1e21',
          primary: '#28a745',
          secondary: '#6c757d',
          success: '#4caf50',
          error: '#ff5252',
          warning: '#ffc107',
          info: '#2196f3',
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount('#app');