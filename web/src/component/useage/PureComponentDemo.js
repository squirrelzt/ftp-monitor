import React, { Component } from 'react';

export default class PureComponentDemo extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isShow: false
        }
        console.log('constructor');
    }
    
    changeState = () => {
        this.setState({
            isShow: true
        });
    }
    render() {
        console.log('render');
        return (
            <div>
                <button onClick={this.changeState.bind(this)}>点击</button>
                <div>{this.state.isShow.toString()}</div>
            </div>
        );
    }

}