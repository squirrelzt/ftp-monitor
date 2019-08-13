import React, {Component} from 'react';
import MyComponent from './MyComponent'

const ClassNameWrapper = ({ children }) => children('demo-class')

const HeadWithClass = (props) => (
    <ClassNameWrapper>
      {(clazz) => <header className={clazz} >demo-class</header>}
    </ClassNameWrapper>
  )

export default class FuncSubComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span>函数子组件FaCC</span>
                <MyComponent value="hello">
                    {(name) => (
                        <div>{name}</div>
                    )
                    }
                </MyComponent>
                <HeadWithClass/>
            </div>
        )
    }
}