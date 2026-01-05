import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import './_EffectFadeSwiper.scss'; // 引入強化樣式

export default function EffectFadeSwiper() {

    const swiperItemData = [
        {
            color:"#ff0000",
        },
        {
            color:"#bbff00",
        },
        {
            color:"#00ff40",
        },
        {
            color:"#0400ff",
        },
        {
            color:"#ff00d4",
        },
    ]

    return (
    <>
        {/* 元件最外圍 */}
        <Swiper
            className='EffectFadeSwiper'
            modules={[Navigation, Pagination, EffectFade]}  //需要用到的模組
            slidesPerView={1}                               //顯示的輪播片數量
            centeredSlides={true}                           //輪播片置中
            loop={true}                                     //開啟輪播片循環
            effect="fade"                                   //啟用淡入淡出
            fadeEffect={{ crossFade: true }}                // 可選：交錯漸變更順
            speed={600}                                     // 可選：動畫時間(毫秒)
            spaceBetween={0}                                //輪播片間隔距離(單位:px)
            pagination={{
                //讓頁碼按鈕可以被點擊
                clickable: true,
                //頁碼按鈕
                el: '.swiper-pagination',
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
        {swiperItemData?.map((item,num) => (
            // 輪播片本體
            <SwiperSlide key={num} className='swiperSlide'>
                {/* 輪播片內容 */}
                <div    className='slide-item' 
                        style={{backgroundColor: item.color}}
                        // 或是這樣寫style={{ backgroundColor: `rgba(255, 136, 0, 0.6)` }}
                >
                    內容:{num}
                </div>
                {/* 輪播片內容 */}
            </SwiperSlide>
            // 輪播片本體
        ))}
            {/* 頁碼按鈕 */}
            {/* 空的為正常 */}
            {/* 套件會自動填充 */}
            <div className="swiper-pagination"></div>
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
    </>
  );
}
