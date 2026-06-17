import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  base: process.env.VITE_DEPLOY_TARGET === 'gh-pages' ? '/Cafe-Website/' : '/',
  plugins: [react()],
})
