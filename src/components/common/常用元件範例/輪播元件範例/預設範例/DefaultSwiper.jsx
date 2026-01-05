import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './_DefaultSwiper.scss'; // 引入強化樣式


export default function DefaultSwiper() {

    //#region
    //#endregion

    //#region 儲存swiper本身資料狀態
        const [mainSwiper, setMainSwiper] = useState(null);
        useEffect(()=>{console.log("更新",mainSwiper?.realIndex)},[mainSwiper]);
    //#endregion

    //#region 控制輪播點目標宣告
        const paginationRef = useRef(null);
    //#endregion

    return (
        <>
            {/* 外層的容器需要具體設定寬度不可使用百分比
            如果要使用百分比的話要使用position進行定位 */}
            {/* 元件最外圍 */}
            <Swiper
                className='swiper'
                modules={[Navigation, Pagination]}//需要用到的模組
                onSwiper={(swiper) => {
                        // 更新 state
                        setMainSwiper({ ...swiper });

                        // 重新綁定 pagination 的 DOM
                        swiper.params.pagination.el = paginationRef.current;

                        // 重新初始化 pagination
                        swiper.pagination.init();
                        swiper.pagination.render();
                        swiper.pagination.update();
                    }}
                onSlideChange={(swiper) => setMainSwiper({ ...swiper })}
                slidesPerView={1}//顯示的輪播片數量
                centeredSlides={true}//輪播片置中
                loop={true}//開啟輪播片循環
                spaceBetween={8}//輪播片間隔距離(單位:px)
                pagination={{
                    //讓頁碼按鈕可以被點擊
                    clickable: true,
                    //頁碼按鈕
                    el: paginationRef.current,
                }}
                navigation={{
                    //右頁按鈕
                    nextEl: '.swiper-button-next',
                    //左頁按鈕
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    //斷點
                    992: {
                    spaceBetween: 40,
                    slidesPerView: 1,
                    }
                }}
            >
            {[1,2,3,4,5].map((item,num) => (
                // 輪播片本體
                <SwiperSlide key={num} className='swiperSlide'>
                    {/* 輪播片內容 */}
                    <div className='slide-item'>
                        內容:{item}
                    </div>
                    {/* 輪播片內容 */}
                </SwiperSlide>
                // 輪播片本體
            ))}
                {/* 頁碼按鈕 */}
                {/* 空的為正常 */}
                {/* 套件會自動填充 */}
                <div ref={paginationRef} className="swiper-pagination"></div>
                {/* 頁碼按鈕 */}

                {/* 左右頁按鈕 */}
                <button className="swiper-button-prev d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </button>
                <button className="swiper-button-next d-none border-0 p-0 d-lg-flex justify-content-center align-items-center">
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button >
                {/* 左右頁按鈕 */}
            </Swiper>
            {/* 元件最外圍 */}
            <div>目前顯示第幾張輪播片 {mainSwiper?.realIndex + 1}</div>
            <div>總輪播數{mainSwiper?.slides.length}</div>
        </>
    );
}
