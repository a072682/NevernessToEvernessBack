import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './_新增文章.scss';//引入指定樣式
import { Link, Navigate } from "react-router-dom";
import ArticleEditor from "../../components/common/Editor/ArticleEditor";
import { articlesUpData, getAllArticlesData } from "../../slice/articlesSlice";
import { Dropdown } from "react-bootstrap";


function 新增文章 (){

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

    //#region 下拉元件判斷是否展開狀態
    const [show, setShow] = useState(false);
    useEffect(()=>{},[show])
    //#endregion

    //#region
    const listData = {
        "system":"系統",
        "activity":"活動",
        "gamenews":"新聞",
    }

    //#region 下拉元件展開內容
    const options = [
        {
            label: "系統",
            class: "system",
        },
        {
            label: "活動",
            class: "activity",
        },
        {
            label: "新聞",
            class: "gamenews",
        }
    ];
    //#endregion

    //#region 文章圖片列表
    const [tempImages, setTempImages] = useState([]);
    useEffect(()=>{
        console.log("文章用圖片",tempImages);
    },[tempImages]);
    //#endregion 

    //#region 宣告文章初始狀態
    const [articleData,setArticleData] = useState({
        category: "",
        title: "",
        content:"",
    })
    useEffect(()=>{
        console.log("文章資料",articleData);
    },[articleData]);
    //#endregion

    //#region 資料輸入函式
    const handleArticleDataInput = (event) => {

        const { name, value } = event.target;

        setArticleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    //#endregion

    //#region 將文章content中取出圖片id列表
    const getContentImgIdListData = (html) => {
    
        const imgUrlListData = html.match(/\/upload\/v\d+\/[^".]+\.\w+/g) || [];
        //console.log("看看內容",imgUrlListData);
        return imgUrlListData.map((item) => { 
            return {
                public_id: item.replace(/\/upload\/v\d+\//, '').replace(/\.\w+$/, '')
            };
        });
    };
    //#endregion

    //#region 取得差值函式
    const handleDeleteImgIdListData = (content,tempImages) => {

        //取出目前文章真正使用的圖片id列表
        const contentImgIdListData = getContentImgIdListData(content).map((item)=>{return(item.public_id)});

        //取出所有圖片id列表
        const allImgIdListData = tempImages.map((item) => {return(item.public_id)});

        //取出差值列表
        const removedImgIdListData = allImgIdListData.filter((id) => {return(!contentImgIdListData.includes(id))});
        console.log("差值列表內容",removedImgIdListData);

        return removedImgIdListData;
    };
    //#endregion

    //#region 文章上傳函式
    const handleArticleSubmit = async () => {

        if (!articleData.title.trim() || !articleData.category.trim()) {
            alert("請輸入種類和標題");
            return;
        }

        try {
            //取出目前文章的圖片id列表
            const contentImgIdListData = getContentImgIdListData(articleData.content);

            //取得差值列表
            const removedImgIdListData = handleDeleteImgIdListData(articleData.content,tempImages);

            // 組合「最終要送出的文章資料」
            const submitArticleData = {
                ...articleData,
                contentImgIdListData,
                removedImgIdListData,
            };

            // 送出文章（正式）
            const result = await dispatch(articlesUpData(submitArticleData)).unwrap();
            console.log("文章已成功新增",result);
            setArticleData({
                category: "",
                title: "",
                content:"",
            });
            setTempImages([]);
            dispatch(getAllArticlesData());
        } catch (error) {
            console.log("文章上傳失敗",error);
        }
    };
    //#endregion

    return(
        <>
            {/* 元件最外圍 */}
            <section className="新增文章">
                {/* 頁面內容 */}
                <div className='新增文章Page'>
                
                    {/* 背景圖片 */}
                    <img className='BgImg' src="/images/index/bg.jpg" alt="" />
                    {/* 背景圖片 */}

                    {/* 主頁面內容 */}
                    <div className="新增文章Content">

                        <h2 className="titleSet">新增文章</h2>
                        {
                            loginState?
                            (
                                <>
                                    {/* 輸入群組設定 */}
                                        {/* 文章類別輸入框 */}
                                        {/* 下拉元件最外層 */}
                                        <Dropdown className='CustomDropdown' 
                                                    show={show} onToggle={(isOpen) => setShow(isOpen)}
                                        >
                                            {/* 元件標頭 */}
                                            <Dropdown.Toggle className='DropdownHeader' 
                                                            as="div" 
                                                            onClick={() => {setShow(!show);}}> 
                                            {/* 要放置的元件 */}
                                            <div className='key'>
                                            {
                                                !articleData.category?
                                                ("請選擇文章類別"):(listData[articleData.category] )
                                            }
                                            </div>
                                            {/* 要放置的元件 */}
                                            </Dropdown.Toggle>
                                            {/* 元件標頭 */}

                                            {/* 元件本體 */}
                                            <Dropdown.Menu  className="dropdownMenuSet">
                                            {
                                                options.map((main, index) => (
                                                /* 內部第一層選項設定 */
                                                <button key={index} 
                                                        className='menuItemSet' 
                                                        onClick={() => {
                                                            setShow(!show);
                                                            setArticleData((item)=>{
                                                                return(
                                                                    {
                                                                        ...item,
                                                                        category:main.class,
                                                                    }
                                                                )
                                                            })
                                                        }}
                                                >
                                                    {main.label}
                                                </button>
                                                /* 內部第一層選項設定 */
                                                ))
                                            }
                                            </Dropdown.Menu>
                                            {/* 元件本體 */}
                                        </Dropdown>
                                        {/* 下拉元件最外層 */}
                                        {/* 文章類別輸入框  */}

                                        {/* 標題輸入框 */}
                                        <div className="inputGroup">
                                            {/* 標籤設定 */}
                                            <label  className="labelSet" 
                                                    htmlFor="articleTitle">
                                                文章標題
                                            </label>
                                            {/* 標籤設定 */}

                                            {/* 輸入端設定 */}
                                            <input
                                                id="articleTitle"
                                                className="inputSet"
                                                type="text"
                                                name="title"
                                                placeholder="請輸入文章標題"
                                                value={articleData.title}
                                                onChange={(event) => {handleArticleDataInput(event)}}
                                            />
                                            {/* 輸入端設定 */}
                                        </div>
                                        {/* 標題輸入框 */}
                                    {/* 輸入群組設定 */}

                                    <div className="d-flex">
                                        <h3 className="titleSet">文章內容</h3>
                                        <button className="btnSet" 
                                                type="button"
                                                onClick={()=>{handleArticleSubmit()}}>
                                            文章上傳
                                        </button>
                                    </div>
                                    
                                    {/* TinyMCE 編輯器 */}
                                    <ArticleEditor
                                        value={articleData?.content}
                                        onChange={(content) => {
                                            setArticleData((originData) => ({
                                                ...originData,
                                                content,
                                            }));
                                        }}
                                        uploadFolder="NevernessToEvernessFolder"
                                        setTempImages={setTempImages}
                                    />
                                    {/* TinyMCE 編輯器 */}
                                    
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
export default 新增文章;