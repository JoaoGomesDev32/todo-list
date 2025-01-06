// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6200ea', // Roxo moderno
          secondary: '#03dac6', // Verde água
          error: '#b00020',
          background: '#f9f9f9', // Fundo claro
          surface: '#ffffff',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

export default vuetify;




