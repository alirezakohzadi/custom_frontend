import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    host: true, // اجازه میده از هر آی‌پی وصل بشی
    port: 5173, // پورت پروژه
    strictPort: true, // اگر پورت اشغال بود، پورت جدید انتخاب نمیشه
    allowedHosts: ['.ngrok-free.app'], // اجازه دادن به تمام ساب‌دامین‌های ngrok
  },

})
