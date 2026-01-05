

import { createHashRouter } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import IndexPage from '../pages/index/IndexPage';
import NotFound from '../pages/NotFound';
import Page0 from '../pages/Page0';
import Page1 from '../pages/Page1';
import 文章列表 from '../pages/文章列表/文章列表';
import 新增文章 from '../pages/新增文章/新增文章';
import 編輯文章 from '../pages/編輯文章/編輯文章';




const router = createHashRouter([ //createHashRouter為建立router的方法
	{
		path:"/",
		element: <FrontLayout />,
        children:[
			{
                path: "",
                element: <IndexPage />,
            },
			{
                path: "Page0",
                element: <Page0 />,
            },
            {
                path: "文章列表",
                element: <文章列表 />,
            },
            {
                path: "新增文章",
                element: <新增文章 />,
            },
            {
                path: "編輯文章",
                element: <編輯文章 />,
            },            
        ]
	},
    {
        path: "*",
        element: <NotFound />,
    }
])
export default router;