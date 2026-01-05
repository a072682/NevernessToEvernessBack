import { Dropdown } from "react-bootstrap";
import './_Dropdown.scss';
import { useEffect, useState } from "react";


function DropdownPart(){

    //元件判斷是否展開狀態
        const [show, setShow] = useState(false);
    //元件判斷是否展開狀態

    //元件標頭狀態
        const [selectedValue, setSelectedValue] = useState("標頭內容");
    //元件標頭狀態

    //元件展開內容
    const options = [
        {
        label: "第一層選項1",               
        },
        {
        label: "第一層選項2",
        }
    ];
    //元件展開內容

    return(
        <>
            {/* 元件最外層 */}
            <Dropdown className='Dropdown' show={show} onToggle={(isOpen) => setShow(isOpen)}>

                {/* 元件標頭 */}
                <Dropdown.Toggle className='DropdownHeader' as="div" onClick={() => {setShow(!show);setActiveMain(null)}}> 
                    {selectedValue}
                </Dropdown.Toggle>
                {/* 元件標頭 */}

                {/* 元件本體 */}
                <Dropdown.Menu className="triple-dropdown-menu">
                    {
                    options.map((main, i) => (
                        /* 內部第一層選項設定 */
                        <button key={i} className='menu-btn' onClick={() => {
                        setActiveMain(main.label);
                        setActiveSub(null); // ✅ 切換主選單時重置子選單
                        }}>
                        {main.label}
                        </button>
                        /* 內部第一層選項設定 */
                    ))
                    }
                </Dropdown.Menu>
                {/* 元件本體 */}
            </Dropdown>
            {/* 元件最外層 */}
        </>
    )
}
export default DropdownPart;