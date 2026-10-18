import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/ecommerce/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
