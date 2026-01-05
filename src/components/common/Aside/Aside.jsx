import { Link, NavLink } from "react-router-dom";
import './_Aside.scss';
import { Nav } from "react-bootstrap";

function Aside(){

    return(
        <>
            <div className="aside">
                <div className="aside-content">
                    <div className="aside-item-box">
                        <Nav.Link as={NavLink} to="/" className="asideItem-set">預約資料</Nav.Link>
                        <Nav.Link as={NavLink} to="/新增文章" className="asideItem-set">新增文章</Nav.Link>
                        <Nav.Link as={NavLink} to="/編輯文章" className="asideItem-set">編輯文章</Nav.Link>
                    </div>
                </div>        
            </div>
        </>
    )
}
export default Aside;