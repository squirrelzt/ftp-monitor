import React, { Component } from 'react'
import auth from '../common/auth';
import './../css/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = [];
    }
    fetch(params = {}) {
        this.setState({ loading: true });
        auth.fetch('/ftp/listFiles','post',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
        });
    };

    componentWillMount(){
        this.fetch();
    };

    fileList(item) {
        if (item.directory) {
            return (
                <div key={item.filename + item.updateTime}>
            <div className="dir-img dir-img" />
            <div className="monitor-file">{item.filename}</div>
            </div>

        )
        } else {
            return (
                <div key={item.filename + item.updateTime}>
            <div className="dir-img txt-img" />
            <div className="monitor-file">{item.filename}</div>
            </div>
        )
        }
    };
    render() {
        const context = this.props.children;

        return (
            <div className="layout-aside" >
                <div className="layout-main" >
                    <div className="header">
                    <div className="title">FTP 监控中心</div>
                </div>
                <div className="monitor-frame">
                {this.state.data != null ?
                    this.state.data.map(item => {
                        return (<div>{this.fileList(item)}</div>)
                    })
                    : null}
                </div>
                <div className="layout-container">
                    <div className="layout-content">
                        {context}
                    </div>
                </div>
                    </div>
            </div>
    )
    }
};
export default Home;