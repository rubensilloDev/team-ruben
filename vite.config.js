// ARCHIVO PARA QUE VITE CUANDO CARGUE LA WEB SEPA QUE NO SOLO ESTA EL INDEX.HTML, SINO QUE TAMBIEN ESTAN LOS DEMASN HTML

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        formulario: resolve(__dirname, 'formulario.html'),
        avisoLegal: resolve(__dirname, 'aviso-legal.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        privacidad: resolve(__dirname, 'politica-de-privacidad.html'),
        terminos: resolve(__dirname, 'terminos-y-condiciones.html'),
      },
    },
  },
});
