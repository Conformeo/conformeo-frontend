import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: false,  // si tu ne veux pas utiliser le support par défaut
    env: {
      API_URL: 'http://localhost:8000'
    },
    setupNodeEvents(on, config) {
      // ici tu pourrais ajouter des tâches node si besoin
      return config;
    },
  },
});
