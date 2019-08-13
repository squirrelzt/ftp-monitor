import React, { Component } from 'react';
import auth from './../../common/auth';
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

    fetchPromise(params = {}) {
        console.log(params);
        return new Promise((resolve, reject) => {
            auth.fetch('/editor/uploadform','post',params,(result)=>{
                console.log("------------------");
                console.log(result);
                resolve(result);
                reject(result);
                this.setState({
                    resultData: result
                });
                if (this.state.resultData != '') {
                    let element = document.createElement('article');
                    element.innerHTML = this.state.resultData;
                    document.body.appendChild(element);
                }
            });
        }).then(data=>{
            console.log('**********');
            console.log(data);
        }).catch(data=> {
            console.log('&&&&&&&&&&&&&&');
            console.log(data);
        });
    };


    componentDidMount(){
        
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
        // this.fetch({
        //     content: this.state.data
        // });
        this.fetchPromise({
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
                                // t.upload.bind(t);
                                return new Promise((resolve, reject) => {
                                    const data = new FormData();
                                    data.append('upload', loader.file);
                                    data.append('allowSize', 10);//允许图片上传的大小/兆
                                    $.ajax({
                                        url: 'http://localhost:8080/editor/loadImage',
                                        type: 'POST',
                                        data: data,
                                        dataType: 'json',
                                        processData: false,
                                        contentType: false,
                                        success: function (data) {
                                            if (data.res) {
                                                resolve({
                                                    default: data.url
                                                });
                                            } else {
                                                reject(data.msg);
                                            }
                        
                                        }
                                    });
                                   
                                });
                            }
                            
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