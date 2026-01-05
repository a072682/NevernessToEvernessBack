import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './_預約資料.scss';//引入指定樣式
import { getAllReservationData } from "../../slice/reservationSlice";



function 預約資料 (){

    //#region
    //#endregion

    //#region 讀取中央函式前置宣告
        //讀取中央函式前置宣告
        const dispatch = useDispatch();
    //#endregion

    useEffect(()=>{
        dispatch(getAllReservationData());
    },[])

    //#region 讀取中央登入資料
    const allData = useSelector((state)=>{
        return(
            state.reservation.allReservationData
        )
    })

    useEffect(()=>{
        console.log("所有預約資料:",allData);
    },[allData])
    //#endregion

    return(
        <>
            {/* 元件最外圍 */}
            <section className="預約資料">
            
                {/* 背景圖片 */}
                <img className='BgImg' src="/images/index/bg.jpg" alt="" />
                {/* 背景圖片 */}

                {/* 頁面內容 */}
                <div className='預約資料Page'>
                    {/* 標題列表 */}
                    <div className="titleBox mb-12">
                        {/* 標題設定 */}
                        <div className="titleSet">國碼</div>
                        <div className="titleSet">電話號碼</div>
                        <div className="titleSet">登陸主機</div>
                        {/* 標題設定 */}
                    </div>
                    {/* 標題列表 */}

                    {/* 資料顯示區塊 */}
                    <div className="dataBox">
                    {
                        allData?.map((item)=>{
                            return(
                                // 資料列表
                                <div key={item.id} className="itemBox">
                                    {/* 資料設定 */}
                                    <div className="itemSet">{item.region_code}</div>
                                    <div className="itemSet">{item.phone_number}</div>
                                    <div className="itemPlatSet">
                                    {
                                        item.platforms?.map((itemIn,index) => {
                                            return(
                                                <div className="platDataSet" key={index}>{itemIn}</div>
                                            )
                                        })
                                    }
                                    </div>
                                    {/* 資料設定 */}
                                </div>
                                // 資料列表
                            )
                        })
                    }
                    </div>
                    {/* 資料顯示區塊 */}
                </div>
                {/* 頁面內容 */}
            </section>
            {/* 元件最外圍 */}
        </>
    )
}
export default 預約資料;