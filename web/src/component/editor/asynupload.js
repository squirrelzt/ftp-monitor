import React, { Component } from 'react'
import axios from 'axios';
import './css/editor.css';

class AsynUpload extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount(){
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
    render() {
        return (
            <div className="monitor-frame">
                <input className="file" key="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" onChange={this.update.bind(this)}/>
            </div>
        )
    }
}

export default AsynUpload;