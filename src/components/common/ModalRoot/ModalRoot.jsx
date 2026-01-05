import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { close, open, MODALS } from "../../../slice/modalSlice";
import TestModal from "../Modal/TestModal/TestModal";
import TestModal02 from "../Modal/TestModal02/TestModal02";



export default function ModalRoot() {

    //#region 讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 讀取中央登入資料
        //讀取中央資料
        const active = useSelector((state)=>{
            return(
                state.modal.activeModal
            )
        })
        useEffect(()=>{},[active])
    //#endregion

    //#region 有開任何一個 modal 時，鎖 body 滾動
    useEffect(() => {
        const prev = document.body.style.overflow;
        if (active) {
            document.body.style.overflow = "hidden";
            console.log("滾動鎖住");
        }else{
            document.body.style.overflow = prev || "auto";
            console.log("滾動解除");
        } 
        return () => { 
            document.body.style.overflow = prev || "auto"; 
        };
    }, [active]);
    //#endregion

    //#region ⎋ 按 ESC 關閉（可選）
      useEffect(() => {
          //如果modal為關閉則跳出
          if (!active) return;
          //如果modal為關閉則跳出

          //如果目標案件為esc則關閉
          const onKey = (event) => {
              if (event.key === "Escape") {
                  dispatch(close());
              }
          };
          //如果目標案件為esc則關閉

          //案鍵被按下的那一刻觸發(addEventListener)
          window.addEventListener("keydown", onKey);
          //案鍵被按下的那一刻觸發(addEventListener)

          //組件卸載時觸發(removeEventListener)
          return () => window.removeEventListener("keydown", onKey);
          //組件卸載時觸發(removeEventListener)
      }, [active, dispatch]);
    //#endregion

    // 依名稱決定要渲染哪個 modal 內容
    const content = useMemo(() => {
      //如果狀態名稱是LOGIN
      if (active === MODALS.TESTMODAL) {
        return (
          <TestModal
            //如果要關閉就使用 onClose?()即可並不是onClose執行完就會執行onSwitch
            onClose={() => dispatch(close())}
            //如果要關閉就使用 onClose?()即可並不是onClose執行完就會執行onSwitch
            onSwitch={() => dispatch(open(MODALS.TESTMODAL02))}
          />
        );
      }
      //如果狀態名稱是REGISTER
      if (active === MODALS.TESTMODAL02) {
        return (
          <TestModal02
            onClose={() => dispatch(close())}
            onSwitch={() => dispatch(open(MODALS.TESTMODAL))}
          />
        );
      }
      return null;
    }, [active, dispatch]);

    // 沒有任何 modal，要回傳 null（不渲染）
    if (!active) return null;

  // 透過 Portal 掛到 body，避免被父層 overflow/z-index 影響
  return createPortal(
    content,
    document.body
  );
}
