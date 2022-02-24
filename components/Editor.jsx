import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

      

const Editor = ({setdescription, description, data}) => {
    return (
        <div>
             <div className="App">
                <h2>Product Description</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data={data || ''}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setdescription(data)
                        console.log( data, 'description', description);
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
            </div>
        </div>
    )
}

export default Editor
