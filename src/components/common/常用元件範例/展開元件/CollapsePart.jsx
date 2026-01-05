


import { useState } from "react";//宣告狀態
import { Collapse } from "react-bootstrap";//宣告元件
import './_CustomCollapse.scss';//讀取樣式


function CollapsePart(){

    // 狀態：控制客製化的 Collapse
    const [openCustom, setOpenCustom] = useState(false);

    return(
        <>
            {/* 元件最外圍 */}
            <div className="CollapseGroup">
                {/* 元件標頭 */}
                <button
                    className="btn btn-warning custom-collapse-button"
                    onClick={() => setOpenCustom(!openCustom)}
                    aria-controls="custom-collapse-text"
                    aria-expanded={openCustom}
                    >
                    客製化展開/收合
                </button>
                {/* 元件標頭 */}

                {/* 元件下拉本體 */}
                <Collapse className="Collapse" in={openCustom}>
                    {/* 內容外框 */}
                    <div    className="custom-collapse-content-box" 
                            style={{ overflow: 'hidden', transition: 'height 0.4s ease' }}>
                        {/* 內容本體 */}
                        <div id="custom-collapse-text" className="custom-collapse-content">
                            這是客製化樣式的 React-Bootstrap Collapse 區塊。
                        </div>
                        {/* 內容本體 */}
                    </div>
                    {/* 內容外框 */}
                </Collapse>
                {/* 元件下拉本體 */}
            </div>
            {/* 元件最外圍 */}
        </>
    )
}
export default CollapsePart;