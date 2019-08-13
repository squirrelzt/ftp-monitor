import React, {Component} from 'react';
import MyComponent from './MyComponent'

const animals = [
    { name: "Tiger", value: "tiger" },
    { name: "Elephant", value: "elephant" },
    { name: "Cow", value: "cow" }
  ];

export default class FuncSubComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span>function sub component</span>
                <MyComponent value="hello">
                    {(name) => (
                        <div>{name}</div>
                    )
                    }
                </MyComponent>
            </div>
        )
    }
}