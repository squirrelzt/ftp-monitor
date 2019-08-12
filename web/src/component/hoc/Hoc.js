import React, {Component} from 'react';
import wrapWithUsername from './wrapWithUsername';

class Hoc extends Component {

    render() {
        return (
            <div>welcome {this.props.username}</div>
        )
    }
}

Hoc = wrapWithUsername(Hoc);

export default Hoc;