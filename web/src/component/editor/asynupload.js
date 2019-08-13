import React, { Component } from 'react'
import axios from 'axios';
import './css/editor.css';
import RichEditor from './richeditor';

class AsynUpload extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            inhtml:''
        };
    }

    updata() {
        this.setState({ 
          inhtml:this.refs.editor.getData()
        });
        console.log('==========================');
        console.log(this.refs.editor.getData());
    }
    componentDidMount(){
    };

    update(e) {
        let file = e.target.files[0];           
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        console.log('-----------------') ;
        console.log(file);
        console.log(param);
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        axios.post('http://127.0.0.1:8080/editor/uploadImage',param,config)
        .then(response=>{
            console.log(response.data);
        });
    }
    updatePromise(e) {
        let file = e.target.files[0];
        new Promise((resolve, reject) => {
            const data = new FormData();
            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            data.append('file',file,file.name);//通过append向form对象添加数据
            console.log('++++++++++++++++++');
            console.log(data);
            console.log(file);
            axios.post('http://127.0.0.1:8080/editor/uploadImage',data,config)
            .then(response=>{
                console.log(response.data);
                resolve("调用成功: " + response);
                reject("调用失败: " + response);
            });
        });
    }
    render() {
        return (
            <div className="monitor-frame">
                <input className="file" key="file" name="file" type="file" 
                accept="image/png,image/gif,image/jpeg" 
                onChange={this.updatePromise.bind(this)}/>
                <button onClick={ this.updata.bind(this)}>减</button>
                <RichEditor ref='editor'/>
                <div dangerouslySetInnerHTML={{__html: this.state.inhtml}}></div>
            </div>
        )
    }
}

export default AsynUpload;