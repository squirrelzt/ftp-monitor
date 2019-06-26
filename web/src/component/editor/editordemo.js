import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios';
import './css/editordemo.css';
import RichEditor from './richeditor';

class EditorDemo extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            inhtml:''
        };
    }

    upload() {
        this.setState({ 
          inhtml:this.refs.editor.getData()
        });
        console.log('==========================');
        console.log(this.refs.editor.getData());
    }
    componentWillMount(){
    };

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
                        <span className="title">上传数据展示区</span>
                        <div dangerouslySetInnerHTML={{__html: this.state.inhtml}}></div>
                    </div>
                  
                </div>
                
            </div>
        )
    }
}

export default EditorDemo;