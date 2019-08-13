import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import auth from './../../common/auth';
import ajax from './../../common/ajax';
import { Icon, Button, Input, Divider, message, Spin, Checkbox } from 'antd';
import './css/DynamicForm.css';
import { string } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

class DynamicForm extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        // this.fetch();
    };

    render() {
        const schema = {
            title: "",
            type: "object",
            properties: {
                "是否启用" :{"type":"boolean","title":"是否启用"},
                "staticQueryDateTime": {"type": "string", "title":"查询时间"},
                "billNoStatisticsInfoList": {"type": "array", "title":"列表", "items": [{
                    "type":"object",
                    "title":"提单类型",
                    "properties":{
                        "billSumQuantity":{
                            "type": "integer",
                            "title": "总货量"
                        },
                        "billCount": {
                            "type": "integer",
                            "title": "单数"
                          },
                          "billType": {
                            "type": "string",
                            "title": "self"
                          }
                    }
                }]
            },
                "billOwnerCount": {type: "string", "title":"已下单客户数"},
            }
          };
          
        const log = (type) => console.log.bind(console, type);
        return (
            <div className="dynamic-form-container">
               <Form schema={schema}
                    onChange={log("changed")}
                    onSubmit={log("submitted")}
                    onError={log("errors")} />
                {/* <Form ref={ref => this.FormWrap = ref} config={config}></Form> */}
            </div>
        )
    }
}

export default DynamicForm;