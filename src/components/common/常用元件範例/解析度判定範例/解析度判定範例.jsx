import { useEffect, useState } from "react";


function 解析度判定範例 (){

    //#region 解析度判定(992px)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
    
    useEffect(() => {
        const resizeHandler = () => {
            setIsDesktop(window.innerWidth >= 992);
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);
    //#endregion

    return(
        <>
        </>
    )
}
export default 解析度判定範例;