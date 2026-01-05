import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './_編輯文章.scss';//引入指定樣式
import { Link, Navigate } from "react-router-dom";
import ArticleEditor from "../../components/common/Editor/ArticleEditor";
import { articlesChangeData, articlesDeleteData, getAllArticlesData, getSingleArticlesData } from "../../slice/articlesSlice";
import { Dropdown } from "react-bootstrap";


function 編輯文章 (){

    //#region
    //#endregion

    //#region 讀取中央登入資料
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
        const dispatch = useDispatch();
    //#endregion

    //#region 所有文章資料狀態宣告
    const[articlesData,setArticlesData] = useState([]);
    useEffect(()=>{
        console.log("所有文章資料:",articlesData);
    },[articlesData])
    //#endregion

    //#region 取得所有資料函式
    const handleGetAllArticlesData = async () => {
        try {
            const originData = await dispatch(getAllArticlesData()).unwrap();
            
            const grouped = {};

            originData.forEach(item => {
                if (!grouped[item.class]) {
                    grouped[item.class] = [];
                }
                grouped[item.class].push(item);
            });

            const result = Object.values(grouped).flat();

            console.log("確認資料",result);
            setArticlesData(result);
        } catch (error) {
            console.log("文章上傳失敗",error);
        }
    }
    //#endregion

    //#region 重新整理時取得資料
    useEffect(()=>{
        handleGetAllArticlesData();
    },[])
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

    //#region 編輯用文章狀態宣告
    const[editArticlesData,setEditArticlesData] = useState({});
    useEffect(()=>{
        console.log("編輯文章資料:",editArticlesData);
    },[editArticlesData])
    //#endregion

    //#region 取得單一文章資料
    const handleGetSingleArticlesData = async(id) => {
        try {
            const result = await dispatch(getSingleArticlesData(id)).unwrap();
            console.log("取得單一文章資料成功",result);
            setEditArticlesData(result.article);
        } catch (error) {
            console.log("取得單一文章資料失敗",error);
        }
    }
    //#endregion

    //#region 資料輸入函式
    const handleEditArticleDataInput = (event) => {

        const { name, value } = event.target;

        setEditArticlesData((originData) => ({
            ...originData,
            [name]: value,
        }));
    };
    //#endregion

    //#region 文章刪除函式
    const handleArticleDelete = async (id) => {
        try{
            const result = await dispatch(articlesDeleteData(id)).unwrap();
            setEditArticlesData({
                category: "",
                title: "",
                content:"",
            });
            handleGetAllArticlesData();
        }catch(error){
            console.log("刪除文章運行失敗",error);
        }
    }
    //#endregion

    //#region 文章圖片列表
    const [tempImages, setTempImages] = useState([]);
    useEffect(()=>{
        console.log("文章用圖片",tempImages);
    },[tempImages]);
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

    //#region 文章修改函式
    const handleArticleChange = async (id) => {

        if (!editArticlesData?.title.trim() || !editArticlesData?.category.trim()) {
            alert("請輸入種類和標題");
            return;
        }

        try{

            //取出目前文章的圖片id列表
            const contentImgIdListData = getContentImgIdListData(editArticlesData.content);

            //取得差值列表
            const removedImgIdListData = handleDeleteImgIdListData(editArticlesData.content,tempImages);

            // 組合「最終要送出的文章資料」
            const submitArticleData = {
                ...editArticlesData,
                contentImgIdListData,
                removedImgIdListData,
            };

            const result = await dispatch(articlesChangeData({id,articleData:submitArticleData,})).unwrap();
            console.log("文章已成功修改",result);
            setEditArticlesData({
                category: "",
                title: "",
                content:"",
            });
            setTempImages([]);
            handleGetAllArticlesData();
        }catch(error){
            console.log("修改文章運行失敗",error);
        }
    }
    //#endregion

    return(
        <>
            {/* 元件最外圍 */}
            <section className="編輯文章">

                {/* 頁面內容 */}
                <div className='編輯文章Page'>

                    {/* 背景圖片 */}
                    <img className='BgImg' src="/images/index/bg.jpg" alt="" />
                    {/* 背景圖片 */}
                    
                    {/* 主頁面內容 */}
                    <div className="編輯文章Content">
                        
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
                                                    <div key={item.id} 
                                                        className='messageItem'
                                                        onClick={()=>{handleGetSingleArticlesData(item.id)}}>
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

                                                        {/* 刪除文章按鈕設定 */}
                                                        <button type="button" 
                                                                className='delBtn'
                                                                onClick={()=>{handleArticleDelete(item.id)}}>
                                                            刪除文章
                                                        </button>
                                                        {/* 刪除文章按鈕設定 */}
                                                    </div>
                                                    //訊息項目本體
                                                )
                                            })
                                        }
                                    </div>
                                    {/* 元件最外圍 */}

                                    {/* 標題設定 */}
                                    <h2 className="titleSet">編輯文章</h2>
                                    {/* 標題設定 */}

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
                                            !editArticlesData.category?
                                            ("請選擇文章類別"):(listData[editArticlesData.category] )
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
                                                            setEditArticlesData((item)=>{
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
                                            value={editArticlesData?.title || ""}
                                            onChange={(event) => handleEditArticleDataInput(event)}
                                        />
                                        {/* 輸入端設定 */}
                                    </div>
                                    {/* 標題輸入框 */}
                                        
                                    {/* 輸入群組設定 */}

                                    <div className="d-flex">
                                        {/* 標題設定 */}
                                        <h3 className="titleSet">文章內容</h3>
                                        {/* 標題設定 */}

                                        {/* 按鈕設定 */}
                                        <button className="btnSet" 
                                                type="button"
                                                onClick={()=>{handleArticleChange(editArticlesData?.id)}}>
                                            修改文章
                                        </button>
                                        {/* 按鈕設定 */}
                                    </div>
                                    {/* TinyMCE 編輯器 */}
                                    <ArticleEditor
                                        value={editArticlesData?.content}
                                        onChange={(content) => {
                                            setEditArticlesData((originData) => ({
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
export default 編輯文章;