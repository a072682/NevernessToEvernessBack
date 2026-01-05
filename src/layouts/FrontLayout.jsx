import { Outlet } from "react-router-dom";
import Header from "../components/common/Header/Header";
import Aside from "../components/common/Aside/Aside";
import ModalRoot from "../components/common/ModalRoot/ModalRoot";


function FrontLayout(){
    return(
        <>
            <Header />
            <div className="d-flex">
                <Aside />
                <Outlet />
            </div>
            <ModalRoot />
        </>
    )
}
export default FrontLayout;