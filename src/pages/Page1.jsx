import { useParams } from "react-router-dom";



function Page1 (){

    //#region 讀取網址中的 id
        const { id } = useParams();
        //console.log("取得的id",id);
    //#endregion

    return(
        <>
            <div>Page1</div>
        </>
    )
}
export default Page1;