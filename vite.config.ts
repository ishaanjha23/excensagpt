import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ THIS is what tells Vercel to load from relative path
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // ✅ this is fine
  },
});
