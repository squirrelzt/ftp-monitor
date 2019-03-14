import React, { Component } from 'react';
import auth from '../common/auth';

export default class Home extends Component {
    state={
        data: []
    }

    fetch(params = {}) {
        this.setState({ loading: true });
        auth.fetch('/listFiles','post',params,(result)=>{
            console.log("------------------");
        console.log(result);
        this.setState({
            data: result
        })
    });
    }

    componentWillMount(){
        this.fetch();
    }

    fileList(item) {
        if (item.directory) {
            return (
                <div key={item.filename + item.updateTime}>
        <img className="dir-img" src="./../../images/dir.png"/>
                <div className="monitor-file">{item.filename}</div>
            </div>

        )
        } else {
            return (
                <div key={item.filename + item.updateTime}>
        <img className="dir-img" src="./../../images/txt.png"/>
                <div className="monitor-file">{item.filename}</div>
            </div>
        )
        }
    }
    render() {
        return (
            <div className="btn-margin">
                <div className="monitor-frame">
                    {this.state.data != null ?
                        this.state.data.map(item => {
                            return (<div>{this.fileList(item)}</div>)
                        })
                    : null}
                </div>
            </div>
        );
    }
}
export default Home