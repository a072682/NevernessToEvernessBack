
import { useState } from 'react';
import './_Mask.scss';

function Mask (){

    const[linkState, setLinkState] = useState(null);

    return(
        <>
            <div className={linkState ? "d-none" : "mask"}>
                <div className="loader">
                    <p className="loader-text" aria-live="polite" aria-busy="true">
                        網站載入中，請稍後
                        <span className="dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Mask;