import React, { Component } from 'react'
import auth from './../../common/auth';
import { Button, Upload } from 'antd';
import './css/PicturesWall.css';

class PicturesWall extends Component {
    constructor(props) {
        super();
        this.state = {
          previewVisible: false,
          previewImage: '',
          fileList: [
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },{
              uid: '-2',
              name: 'java.png',
              status: 'done',
              url: 'http://127.0.0.1:8080/111111.jpg',
            }
          ],
        }
    }

    componentWillMount(){

    }
    handleChange = (evt) => {
      // console.log('-----------------');
      // console.log(evt);
      this.setState({
        fileList: evt.fileList
      })
      // console.log(this.state.fileList);
    }
    handlePreview = file => {
      console.log('=================');
      if (!file.url && !file.preview) {
        // file.preview = await getBase64(file.originFileObj);
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          file.preview = reader.result;
          this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
          });
        };
      }
  
      // this.setState({
      //   previewImage: file.url || file.preview,
      //   previewVisible: true,
      // });
    };
    getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    render() {
      const props = {
        listType: 'picture',
        defaultFileList: [...this.state.fileList],
      };
        return (
            <div id="pictures-wall-container" >
              <Upload  
              listType="picture-card"
              fileList={this.state.fileList}
              onChange={this.handleChange}>
              
              </Upload>
            </div>
        )
    }
};
export default PicturesWall;