import axios from 'axios';

// 請求攔截器(全域)：每次發送 request 前執行
axios.interceptors.request.use((config) => {
    //確認是否在前端執行
    if (typeof window !== 'undefined') {
        // 從 localStorage 取得 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
