import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_LoginCheckModal.scss';
import { useEffect } from "react";
import { authMsgUpLoad } from "../../../../slice/authSlice";

//setHandleLoginPageModal,loginModalShow,setLoginModalShow 都移除

function LoginCheckModal ({onClose, onSwitch}){

    //#region
    //#endregion

    //#region 跳轉網址前置宣告
        const navigate = useNavigate();
    //#endregion

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央登入資料
        const loginState = useSelector((state)=>{
            return(
                state.auth.loginState
            )
        })
        useEffect(()=>{
            // 如果已經登入則關閉Modal
            if (loginState) {

                const timer = setTimeout(() => {
                    dispatch(authMsgUpLoad(""));
                    onClose();
                }, 300); // 0.3 秒

                return () => clearTimeout(timer); // 清除 timer
            }
        },[loginState])
    //#endregion

    //#region 讀取登入訊息資料
        const authMsgData = useSelector((state)=>{
            return(
                state.auth.authMsg
            )
        })
        useEffect(()=>{
            //console.log("訊息確認:",authMsgData);
        },[authMsgData])
    //#endregion
    

    //#region 點背景遮罩時Modal關閉,點內容不關
        const handleBackdropClick = (e) => {
            if (e.target === e.currentTarget) onClose?.();
        };
    //#endregion

    return(
        <>
            {/* 遮罩 */}
            <div
                className="Mask LoginCheckModal show" 
                role="dialog"
                onClick={handleBackdropClick}
                aria-modal="true"
                tabIndex={-1}
            >

                {/* 定位至置中效果 */}
                <div className="modalDialog">

                    {/* model整體元件 */}
                    <div className="modalContent border-0 ">

                        {/* model本體背景 */}
                        <div className="LoginModalBodySet">
                            {authMsgData}
                        </div>
                        {/* model本體背景 */}
                    </div>
                    {/* model整體元件 */}
                </div>
                {/* 定位至置中效果 */}
            </div>
        </>
    )
}
export default LoginCheckModal