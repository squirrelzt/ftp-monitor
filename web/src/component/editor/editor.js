import React, { Component } from 'react';
import auth from './../../common/auth';
import ajax from './../../common/ajax';
import './css/editor.css'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Editor extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            resultData: ''
        };
    }
    fetch(params = {}) {
        console.log(params);
        // auth.fetch('/editor/uploadform','post',params,(result)=>{
        auth.fetch('/editor/uploadform','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                resultData: result
            });
            if (this.state.resultData != '') {
                let element = document.createElement('article');
                element.innerHTML = this.state.resultData;
                document.body.appendChild(element);
            }
        });
    };

    componentWillMount(){
        
    };

    MyUploadAdapterPlugin( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
            // ...
            console.log('+++++++++++++++++');
            console.log(editor);
        };
    }
    onSubmit() {
        // console.log('*****************');
        // console.log(this.state.data);
        this.fetch({
            content: this.state.data
        });
    }
    upload() {
        console.log('#############')                        
    }
    render() {
        // console.log('--------------');
        // console.log(this.state.data);
        return (
            <div className="monitor-frame">
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                            // extraPlugins: [this.MyUploadAdapterPlugin ]
                            let t = this;
                            editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
                                // ...
                                console.log('+++++++++++++++++');
                                console.log(editor);
                                console.log(loader.file);
                                t.upload.bind(t);
                            };
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            // console.log( { event, editor, data } );
                            this.setState({
                                data: data
                            });
                        } }
                        onBlur={ editor => {
                            // console.log( 'Blur.', editor );
                        } }
                        onFocus={ editor => {
                            // console.log( 'Focus.', editor );
                        } }
                    />
                    <button onClick={this.onSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}
export default Editor;