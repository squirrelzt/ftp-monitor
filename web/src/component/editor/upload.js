import React, { Component } from 'react'
import axios from 'axios';
import auth from './../../common/auth';
import ajax from './../../common/ajax';
import './css/editor.css';
import $ from "jquery";

class Upload extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        // auth.fetch('/ftp/listFiles','post',params,(result)=>{
        //     console.log("------------------");
        //     console.log(result);
        //     this.setState({
        //         data: result
        //     })
        // });
      
    };

    componentDidMount(){
        // this.fetch();
    };

    onOk() {
        console.log('----------------');
        console.log($('.file-form').val());
    }
    render() {
        return (
            <div className="monitor-frame">
                <div className="file-upload-tip">文件上传</div>
                <form className="file-form" action="http://localhost:8080/editor/uploadImage" method="POST" encType="multipart/form-data">
                    文件：<input className="file-select" type="file" name="file" key="file"/>
                    <input className="file-submit" type="submit"/>
                </form> 
            </div>
        )
    }
}

export default Upload;