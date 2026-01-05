


import { motion } from "framer-motion";
import './_DefaultExample.scss';

export default function DefaultExample() {
  return (
    <>
        <div className="基礎範例">
            <h4>基本範例</h4>
            <motion.div
                className="motionBox"
                //元件「初始狀態」的樣式
                initial={{ opacity: 0, y: 40 }}

                //元件最終狀態的樣式
                whileInView={{ opacity: 1, y: 0 }}

                //元件動畫流程樣式
                transition={{ duration: 0.6, ease: "easeOut" }}
                
                //元件的觸發位置
                viewport={{ margin: "-10% 0px 0px 0px", once: false, amount: 0 }}
            >
                <div className="box">
                    當我滾到視窗正中線附近才會觸發
                </div>
            </motion.div>
            <br />
            <p>範例說明</p>
            <p>樣式載入(自行設定)</p>
            <p className="fw-bold fs-20">className="motionBox"</p>
            <br />
            <p> 元件「初始狀態」的樣式（距離單位為 px）</p>
            <p className="fw-bold fs-20">{`initial={{ opacity: 0, y: 40 }}`}</p>
            <br />
            <p> 元件「最終狀態」的樣式（由 viewport 觸發）</p>
            <p> 預設為雙向：進入可視區 → 播進場；離開可視區 → 播回去</p>
            <p className="fw-bold fs-20">{`whileInView={{ opacity: 1, y: 0 }}`}</p>
            <br />
            <p> 元件動畫流程設定</p>
            <p> duration：動畫持續秒數</p>
            <p> ease："easeOut" 表示先快後慢</p>
            <p className="fw-bold fs-20">{`transition={{ duration: 0.6, ease: "easeOut" }}`}</p>
            <br />
            <p> 元件的觸發位置設定（viewport）</p>
            <p> margin：調整可視區判定範圍</p>
            <p> once：是否只觸發一次（false 可多次觸發）</p>
            <p> amount：目標元素進入可視區多少比例才觸發</p>
            <p> amount: 0 → 只要碰到可視區就觸發</p>
            <p> amount: 0.5 → 至少 50% 面積進入</p>
            <p> amount: "some" → 相當於局部（約 0.5）</p>
            <p> amount: "all" → 整個元素進入才觸發</p>
            <p className="fw-bold fs-20">{`viewport={{ margin: "-10% 0px 0px 0px", once: false, amount: 0 }}`}</p>
            <br />
        </div>
    </>
  );
}
