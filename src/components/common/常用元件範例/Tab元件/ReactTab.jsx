
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import './_ReactTab.scss';

export default function ReactTab() {

    const [activeTab, setActiveTab] = useState('one');//tab控制

    const tabdata = [
        {
            title:"one",
            key:"one",
            pageData:"one",
            disabled: false,
        },
        {
            title:"two",
            key:"two",
            pageData:"two",
            disabled: false,
        },
        {
            title:"three",
            key:"three",
            pageData:"three",
            disabled: true,
        },
    ]

  return (
    <>  
        {/* 最外框 */}
        <div className="app-tabs">
            {/* 控制層 顯示元素不存在 */}
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

                {/* Tab 選單區 */}
                <Nav className='d-flex flex-row tab-box'>
                    {/* 選項按鈕外層 */}
                    <Nav.Item  className='tab-item'>
                    {
                        tabdata?.map((item)=>{
                            return(
                                <>
                                    {/* 選項按鈕本體 */}
                                    <Nav.Link   key={item.key}
                                                className={`tab-link ${item.disabled ? 'is-disabled' : ''}`} 
                                                aria-disabled={item.disabled} 
                                                eventKey={item.key}>
                                        {item.title}
                                    </Nav.Link>
                                    {/* 選項按鈕本體 */}
                                </>
                            )
                        })
                    }
                    </Nav.Item>
                    {/* 選項按鈕外層 */}
                </Nav>
                {/* Tab 選單區 */}

                {/* Tab 內容區 */}
                <Tab.Content className='h-100'>
                    {
                        tabdata?.map((item)=>{
                            return(
                                <>
                                    {/* 內容外層 */}
                                    <Tab.Pane   key={item.key} 
                                                eventKey={item.key}>
                                        {item.pageData}
                                    </Tab.Pane>
                                    {/* 內容外層 */}
                                </>
                            )
                        })
                    }
                </Tab.Content>
                {/* Tab 內容區 */}
            </Tab.Container>
            {/* 控制層 顯示元素不存在 */}
        </div>
        {/* 最外框 */}
    </>
  );
}
