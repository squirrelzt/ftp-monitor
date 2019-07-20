import React, { Component } from 'react'
import auth from './../../common/auth';

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
              },
            ],
          }
    }

    componentWillMount(){
        // let file = {
        //     uid: '-1',
        //     name: 'xxx.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }
        // let file = document.getElementById('imgId');
        // let img = this.getBase64(file);
        // this.setState({
        //     previewImage: img
        // })

        // const reader = new FileReader();
        //   reader.readAsDataURL(file);
        //   reader.onload = (e) => {
        //     this.setState({
        //         previewImage: e.target.result
        //     })
        //   }

    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      onChange = (evt) => {
        console.log('--------------')
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
          document.getElementById('imgId').src = e.target.result;
      }
      }
    render() {
        
        return (
            <div className="pic-container" >
              <input type="file" id="uploadfile" onChange={this.onChange}></input>
              <img id="imgId" src=""/>
            </div>
        )
    }
};
export default PicturesWall;