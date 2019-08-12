import React, {Component} from 'react';
import wrapWithUsername from './wrapWithUsername';

class Welcome extends Component {

    render() {
        return (
            <div>welcome {this.props.username}</div>
        )
    }
}

Welcome = wrapWithUsername(Welcome);

export default Welcome;