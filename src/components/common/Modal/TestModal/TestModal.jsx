import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './_TestModal.scss';

//setHandleLoginPageModal,loginModalShow,setLoginModalShow 都移除

function TestModal ({onClose, onSwitch}){

    //#region
    //#endregion

    //#region 跳轉網址前置宣告
        const navigate = useNavigate();
    //#endregion

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
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
                className="testModal test01 show" 
                role="dialog"
                onClick={handleBackdropClick}
                aria-modal="true"
                tabIndex={-1}
            >

                {/* 定位至置中效果 */}
                <div className="modalDialog">

                    {/* model整體元件 */}
                    <div className="modalContent border-0 ">

                        {/* header設定 */}
                        <div className="modalHeader LoginModalHeaderBgSet">
                            header內容
                        </div>

                        {/* model本體背景 */}
                        <div className="LoginModalBodySet">
                            本體內容 test01
                            <button type="button"
                                    onClick={() => {onSwitch?.();}}
                            >
                                測試切換功能
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TestModal