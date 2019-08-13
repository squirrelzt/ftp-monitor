import React, {Component} from 'react';

// Functions as Child Components FaCC
export default class MyComponent extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        value: null,
        onChange: () => {},
        children: () => {}
      };
    render() {
        // console.log(this.props.options)
        console.log(this.props.children);
        console.log(this.props.value);
        // console.log(this.props.children(this.props.value))
        return (
            <div>
                {this.props.value && this.props.children(this.props.value)}
            </div>
        )
    }
}