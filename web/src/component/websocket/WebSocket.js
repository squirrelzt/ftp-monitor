import React, { Component } from 'react'
import auth from './../../common/auth';
import ajax from './../../common/ajax';
import { Button } from 'antd';
import './css/WebSocket.css';
import Websocket from 'react-websocket';

class WebSocket extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }
    fetch(params = {}) {
        ajax.axiosRequest('/ws/send','get',params,(result)=>{
            console.log("------------------");
            console.log(result);
            
        })
    };

    componentDidMount(){
        // this.fetch();
        // console.log('+++++++++++++++++++++');
        // let ws = new WebSocket("ws://localhost:8080/websocket");
        // ws.onopen = function() {
        //     ws.send("hello one");
        //     console.log("open");
        // }
        // ws.onmessage = (e) => { 
        //     console.log('--------------------');
        //     console.log('message', e.data);
        // };
        // ws.onclose = () => { 
        //     console.log('close');
        // };
    };

    
    handleData(data) {
        let result = JSON.parse(data);
        this.setState({count: this.state.count + result.movement});
      }
    handleOk = () => {
        this.fetch();
    }
    render() {
        return (
            <div className="websocket-container">
                <span>websocket</span>
                <Websocket url='ws://localhost:8080/websocket?businessKey=color'
                    onMessage={this.handleData.bind(this)}/>
                <Button onClick={this.handleOk}>确定</Button>                    
            </div>
        )
    }
}

export default WebSocket;