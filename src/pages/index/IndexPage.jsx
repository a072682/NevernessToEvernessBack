import { useDispatch, useSelector } from "react-redux";
import { MODALS, open } from "../../slice/modalSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './_index.scss';//引入指定樣式
import AuthContent from "./authContent/authContent";
import 預約資料 from "../預約資料/預約資料";


function IndexPage (){

    //#region
    //#endregion

    //#region SEO流程宣告
    useEffect(() => {
        //標題
        document.title = "異環|複現專案後台";

        //簡介
        let metaTag = document.querySelector("meta[name='description']");
        if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.setAttribute("name", "description");
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute(
            "content",
            "專案後臺首頁"
        );
    }, []);
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

    return(
        <>
            {/* 元件最外圍 */}
            <section className="index">
                {/* 頁面內容 */}
                <div className='indexPage'>

                    {/* 背景圖片 */}
                    <img className='BgImg' src="/images/index/bg.jpg" alt="" />
                    {/* 背景圖片 */}

                    {/* 主頁面內容 */}
                    <div className="indexContent">
                    {
                        loginState?
                        (
                            <>
                                <預約資料 />
                            </>
                        )
                        :
                        (
                            <AuthContent />
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
export default IndexPage;