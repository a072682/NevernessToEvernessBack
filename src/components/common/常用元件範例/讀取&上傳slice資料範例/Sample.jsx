import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testDataUpLoad } from "../../../slice/testSlicejs";


function Sample (){

    //#region 讀取slice資料
        const testData = useSelector((state)=>{
            return(
                state.test.testData
            )
        })

        useEffect(()=>{},[testData])
    //#endregion

    //#region 上傳資料至slice前置宣告
        const dispatch = useDispatch();
    //#endregion

    //#region 上傳資料至slice
        //連線測試
        
        dispatch(testDataUpLoad("上傳內容")); 
        
        //連線測試
    //#endregion

    return(
        <>
            
        </>
    )
}
export default Sample;