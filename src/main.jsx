import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./components/common/api/axios";;//引入執行攔截器

import { Provider } from 'react-redux'//使用ReduxToolkit時引入
import { store } from './store.js'//使用ReduxToolkit時引入

import { RouterProvider } from 'react-router-dom';//react-router
import router from './router';//react-router

import 'bootstrap/dist/css/bootstrap.min.css';//Bs5Css檔案

import './assets/styles/all.scss'//客製化scss檔案




createRoot(document.getElementById('root')).render(

  	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>
  
)
