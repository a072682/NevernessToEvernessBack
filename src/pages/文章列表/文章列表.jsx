import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './_文章列表.scss';//引入指定樣式
import { Link, Navigate } from "react-router-dom";
import { getAllArticlesData } from "../../slice/articlesSlice";


function 文章列表 (){

    //#region
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.auth.loginState
            )
        })
        useEffect(()=>{
            console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 所有文章資料狀態宣告
    const[articlesData,setArticlesData] = useState([]);
    useEffect(()=>{
        //console.log("所有文章資料:",articlesData);
    },[articlesData])
    //#endregion
    //#region 
    const handleGetAllArticlesData = async () => {
        try {
            const result = await dispatch(getAllArticlesData()).unwrap();
            console.log("確認資料",result);
            setArticlesData(result);
        } catch (error) {
            console.log("文章上傳失敗",error);
        }
    }
        useEffect(()=>{
            handleGetAllArticlesData();
        },[])
        //const dispatch = useDispatch();
    //#endregion

    return(
        <>
            {/* 元件最外圍 */}
            <section className="文章列表">
                {/* 頁面內容 */}
                <div className='文章列表Page'>

                    {/* 背景圖片 */}
                    <img className='BgImg' src="/images/index/bg.jpg" alt="" />
                    {/* 背景圖片 */}

                    {/* 主頁面內容 */}
                    <div className="文章列表Content">
                    
                    {
                        loginState?
                        (
                            <>
                                {/* 元件最外圍 */}
                                <div className="MessageItemBox">
                                    {/* 標題設定 */}
                                    <h2 className="titleSet">文章列表</h2>
                                    {/* 標題設定 */}
                                    {
                                        articlesData?.map((item,index)=>{
                                            return(
                                                //訊息項目本體
                                                <Link key={item.id} className='messageItem' href="">
                                                    {/* 類別設定 */}
                                                    <div className={`class ${item.class}`}>
                                                        {
                                                            item.class === "system"? "系統"
                                                            : item.class === "activity"? "活動"
                                                            : item.class === "gamenews"? "新聞"
                                                            : ""
                                                        }
                                                    </div>
                                                    {/* 類別設定 */}

                                                    {/* 內容設定 */}
                                                    <div className='content'>{item.title}</div>
                                                    {/* 內容設定 */}

                                                    {/* 時間設定 */}
                                                    <div className='time'>{item.created_at.split("T")[0]}</div>
                                                    {/* 時間設定 */}
                                                </Link>
                                                //訊息項目本體
                                            )
                                        })
                                    }
                                </div>
                                {/* 元件最外圍 */}
                            </>
                        )
                        :
                        (
                            <Navigate to="/" replace />
                        )
                    }
                    </div>
                    {/* 主頁面內容 */}

                </div>
                {/* 頁面內容 */}
            </section>
            {/* 元件最外圍 */}
        </>
    )
}
export default 文章列表;