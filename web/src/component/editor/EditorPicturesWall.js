import React, { Component } from 'react'
import { Button, Upload } from 'antd';
import axios from 'axios';
import './css/EditorPicturesWall.css';
import RichEditor from './richeditor';
import {Upload as CustomerUpload} from './upload';
import $ from 'jquery';

class EditorPicturesWall extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            inhtml:'',
            // fileList:[],
            fileList: [
                {
                  uid: '-1',
                  name: 'one.png',
                  status: 'done',
                  url: 'http://127.0.0.1:8080/one.png',
                },{
                  uid: '-2',
                  name: 'two.png',
                  status: 'done',
                  url: 'http://127.0.0.1:8080/two.png',
                }
              ],
              test:[]
        };
    }

    upload() {
        this.setState({ 
          inhtml:this.refs.editor.getData()
        });
        // console.log('==========================');
        console.log(this.refs.editor.getData());
        const element = document.createElement('div');
        element.innerHTML = this.refs.editor.getData();
       
        const titleElement = document.getElementById('title');
        titleElement.appendChild(element);
        // let fileList = [
        //     {
        //       uid: '-1',
        //       name: 'one.png',
        //       status: 'done',
        //       url: 'http://127.0.0.1:8080/one.png',
        //     }
        //   ];
        // const uploadItem = <Upload listType="picture-card" fileList={fileList}></Upload>;
        
        // titleElement.appendChild(uploadItem);                     
        // this.setState({
        //     test: uploadItem
        // })
        const uploadItems = $('figure img').each( function() {
            let imgUrl = $(this).attr("src");
            console.log('---------------------');
            console.log(imgUrl);
            let fileList = [
                {
                  uid: imgUrl,
                  name: imgUrl,
                  status: 'done',
                  url: imgUrl,
                }
              ];
              return( <Upload listType="picture-card"
                                fileList={fileList}>

                                </Upload>);
        });
        console.log(uploadItems);
        // this.setState({
        //     test: uploadItems
        // })
        // titleElement.appendChild(test);
        // let t = this;
        // $('.demo-content img').each( function() {
        //     let imgUrl = $(this).attr("src");
        //     let file = {
        //         uid: '3',
        //             name: 'one.png',
        //             status: 'done',
        //             url: imgUrl
        //     };
        //     const uploadItem = '<Upload class="uploadT" className="uploadT" listType="picture-card" ></Upload>'
        //     $(this).after(uploadItem);
        //     $('.uploadT').attr('fileList', t.state.fileList);
        //     console.log('---------------------');
        //     console.log(imgUrl);
        // });
    }
    componentWillMount(){
    };
    handleChange = (evt) => {
        // console.log('-----------------');
        // console.log(evt);
        this.setState({
          fileList: evt.fileList
        })
        // console.log(this.state.fileList);
      }
    render() {
        return (
            <div id="editor-demo-container">
                <div className="editor-section">
                    <div className="editor-content">
                        <span className="title">富文本编辑区</span>
                        <RichEditor ref='editor' className="rich-editor"/>
                        <Button type="primary" className="upload-btn" onClick={this.upload.bind(this)}>上传</Button>
                    </div>
                    
                </div>
                <div className="demo-section">
                    <div className="demo-content">
                        <span className="title" id="title">上传数据展示区</span>
                        {/* <div dangerouslySetInnerHTML={{__html: this.state.inhtml}}></div> */}
                        {/* <Upload
                        listType="picture-card"
                        fileList={this.state.fileList}
                        onChange={this.handleChange}></Upload> */}
                        {this.state.test}
                    </div>
                  
                </div>
                
            </div>
        )
    }
}

export default EditorPicturesWall;