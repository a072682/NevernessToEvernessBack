import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

import './_Header.scss';
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, logout } from "../../../slice/authSlice";


function Header(){

    //#region
    //#endregion
    
    //#region 側邊狀態
        //側邊狀態
            // const [onOpen, setOnOpen] = useState(false); // 控制 offcanvas 開關
            // useEffect(()=>{},[onOpen]);

            // const handleOpen = () => setOnOpen(true);
            // const handleClose = () => setOnOpen(false);
        //側邊狀態
    //#endregion

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //#region 讀取中央登入資料
        //讀取中央資料
        const loginState = useSelector((state)=>{
            return(
                state.auth.loginState
            )
        })

        useEffect(()=>{
            //console.log("loginState狀態:",loginState);
        },[loginState])
    //#endregion

    //#region 登入確認
        //登入確認
        useEffect(()=>{
            dispatch(checkLogin());
        },[]);
        //登入確認
    //#endregion

    const [expanded, setExpanded] = useState(false);
    
    return(
        <>
            {/* 元件最外圍 */}
            <Navbar expand="lg" className="navBg-set" expanded={expanded} id="siteHeader">
                {/* /*內容本體區塊*/}
                <div className='navbar-box'>
                    {/* 左上角 Logo */}
                    <Link to="/" className='navbarLogo-box'>
                        <img className="navbarLogoImg-set" src="/images/header/NTE_logo.png" alt="home-section2-1" />
                    </Link>
                    {/* 左上角 Logo */}

                    
                    {/* lg 以上選項區塊 */}
                    <div className="navbarItem-box d-none d-lg-flex">
                        {/* link選項 */}
                        <Nav.Link as={NavLink} to="/Page0" className="navbarItem-set">Page0</Nav.Link>
                        <Nav.Link as={NavLink} to="/文章列表" className="navbarItem-set">文章列表</Nav.Link>
                        <Nav.Link as={NavLink} to="/新增文章" className="navbarItem-set">新增文章</Nav.Link>
                        <Nav.Link as={NavLink} to="/編輯文章" className="navbarItem-set">編輯文章</Nav.Link>
                        {/* link選項 */}
                    </div>
                    {/* lg 以上選項區塊 */}

                    {/* lg 以上會員頭像 */}
                    {
                        loginState?
                        (
                            <button className="userImg-box d-none d-lg-flex"
                                    onClick={()=>{dispatch(logout())}}>
                                管理員登出
                            </button>
                        )
                        :
                        (
                            <button className="userImg-box d-none d-lg-flex"
                                    onClick={()=>{navigate("/")}}>
                                管理員登入
                            </button>
                        )
                    }
                    
                     
                    {/* lg 以下的右上角：漢堡選單按鈕 */}
                    <div className="navbarMenuIcon-box d-flex d-lg-none">
                        <button className="MenuIconBtn-set">
                           管理員登入
                        </button>
                    </div>
                    {/* lg 以下的右上角：漢堡選單按鈕 */}
                </div>
                {/* /*內容本體區塊*/}
            </Navbar>
            {/* 元件最外圍 */}
            {/* <OffcanvasPage onOpen={onOpen} handleClose={handleClose} loginState={loginState}/> */}
        </>
    )
}

export default Header;
