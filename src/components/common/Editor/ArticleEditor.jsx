import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import './_ArticleEditor.scss';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ArticleEditor({value, onChange, uploadFolder = 'testFolder', setTempImages}) {

    //#region 
    //#endregion

    //#region 圖片上傳
    const uploadImage = async (file) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('folder', uploadFolder);
        formData.append('file', file);

        const uploadImageRes = await axios.post(`${BASE_URL}/images/upload`,formData);
        console.log("圖片上傳成功:",uploadImageRes.data);

        // 記錄圖片
        // tempImagesRef.current.push({
        //     public_id: uploadImageRes.data.result.public_id,
        //     url: uploadImageRes.data.result.url,
        // });
        setTempImages((prev) => [
            ...prev,
            { 
                public_id:uploadImageRes.data.public_id, 
                url: uploadImageRes.data.url,
            }
        ]);

        return uploadImageRes.data.url;
    };
    //#endregion

    //#region init設定
    const editorInit = {
        cloudChannel: '6',
        menubar: false,
        statusbar: false,
        min_height: 300,

        plugins: [
            'advlist',
            'autolink',
            'autoresize',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
        ],

        toolbar:
        'undo redo | formatselect | fontfamily | fontsize ' +
        'bold italic underline | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'image | removeformat | help',

        content_style: `
            body {
                font-family: "微軟正黑體";
                font-size: 16px;
            }
            img {
                max-width: 100%;
                border-radius: 8px;
            }
        `,
        images_upload_handler: async (blobInfo) => {

            // 將原始圖片轉換為blob物件
            const file = blobInfo.blob();

            // 產生本地預覽用的 URL
            // 臨時URL在更新文章等動作時都會刷新，會一直改變無法拿來做比對目標
            //const localUrl = URL.createObjectURL(file);
            const imageUrl = await uploadImage(file);

            return Promise.resolve(
                imageUrl
            );
        },
    };
    //#endregion

    return (
        <div className='tinymceBox'>
            <Editor
                className="tinymceSet"
                apiKey="oolcf7lp0e9ytgb09urqt5u3833g65oqfntw2j1rfvsldoau"
                value={value}
                init={editorInit}
                onEditorChange={onChange}
            />
        </div>
        
    );
}
