import React, { Component } from 'react';
import { Form, Menu, Icon, Upload, Table, Divider, Button } from 'antd';
import auth from '../../common/auth';
import ajax from '../../common/ajax';
import './css/editor.css'


class AntUpload extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
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

   
  
    upload() {
        console.log('#############')                        
    }
    onUploadChange(info) {
        console.log('-------------------');
        console.log(info);
    }
    render() {
        // console.log('--------------');
        // console.log(this.state.data);
        const props = {
            key: 'file',
            name: 'file',
            action: auth.getPath() + '/editor/uploadImage',
            headers: {
              authorization: 'authorization-text',
            },
            onChange: this.onUploadChange.bind(this)
        };
        return (
            <div className="monitor-frame">
                <Upload {...props}>
                    <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
            </div>
        )
    }
}
export default AntUpload;