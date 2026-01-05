import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
})

//如果要上傳到vercel則修改為base: "/",
//如果要上傳到githubPage則修改為base: process.env.NODE_ENV === 'production' ? '/xxx/' : '/',
//xxx為github暫存器的名稱
//如果要上傳到githubPage 則 圖片網址需要增加 ${import.meta.env.BASE_URL}
// 範例:
// 更改前: `/images/photo1.png`,
// 更改後: `${import.meta.env.BASE_URL}images/photo1.png`,
