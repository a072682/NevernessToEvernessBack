import { Accordion } from "react-bootstrap";
import './_CustomAccordion.scss';//讀取樣式


function AccordionPart(){
    return(
        <>
            {/* 元件最外圍 */}
            <Accordion defaultActiveKey="" className="custom-ReactAccordion mb-24">
                {/* 預設不打開任何一個	<Accordion defaultActiveKey=""> */}
                {/* 元件項目外圍 */}
                <Accordion.Item eventKey="0" className="custom-ReactAccordionItem">
                    {/* 元件標頭 */}
                    <Accordion.Header className="custom-ReactAccordionHeader">
                        客製化樣式 - 標題 #1
                    </Accordion.Header>
                    {/* 元件標頭 */}

                    {/* 元件本體 */}
                    <Accordion.Body className="custom-ReactAccordionBody">
                        這是客製化樣式的 React-Bootstrap 手風琴內容。
                    </Accordion.Body>
                    {/* 元件本體 */}
                </Accordion.Item>
                {/* 元件項目外圍 */}
            </Accordion>
            {/* 元件最外圍 */}
        </>
    )
}
export default AccordionPart;