import React, { Component } from 'react';
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ajax from './../../common/ajax';
import { func } from 'prop-types';
class RichEditor extends Component {
    constructor(props) {
        super(props);      // 当父组件向子组件传递数据时，需要在这里传入props。
        this.state = {     // 通过state来定义当前组件内部自己的数据
        };
    }
    componentWillMount() { }
    componentDidMount() {
        // var Pro = function (time) {
        //     //返回一个Promise对象
        //     return new Promise(function (resolve, reject) {
        //         console.log('123');
        //         //模拟接口调用
        //         setTimeout(function () {
        //             //这里告诉Promise 成功了，然后去执行then方法的第一个函数
        //             resolve('成功返回');
        //         }, time);
        //     })
        // };
        // (function(){
        //     console.log('start');
        //     Pro(3000)
        //     .then(function(data){
        //         console.log("-------" +data);
        //         return Pro(5000);})
        //     .then(function(data){
        //         console.log("========="+data);
        //         console.log('end');
        //     })
        // })();

        class UploadAdapter {
            constructor(loader) {
                this.loader = loader;
            }
            // 上传图片方法   
            upload() {
                let file = this.loader.file;
                return new Promise((resolve, reject) => {
                    let uploadImgMethod = f => {
                        const data = new FormData();
                        const config = {
                            headers: { "content-type": "multipart/form-data" }
                        };
                        // f.key = "file";
                        data.append("file", f, f.name);
                        console.log('++++++++++++++++++');
                        console.log(data);
                        // console.log(file);
                        console.log(f);
                        axios.post('http://127.0.0.1:8080/editor/uploadImage',data,config)
                        .then(response=>{
                            console.log(response.data);
                            resolve("调用成功: " + response);
                            reject("调用失败: " + response);
                        });
                        // ajax.axiosRequest('/editor/uploadImage','post',data,(result)=>{
                        //     console.log("------------------");
                        //     console.log(result);
                        //     resolve("调用成功: " + response);
                        //     reject("调用失败: " + response);
                        // });
                        // axios.post("http://127.0.0.1:8080/editor/uploadImage", data, config)
                        //     .then(response => {
                        //         resolve({
                        //             default: response.data.url
                        //         });
                        //         reject("调用失败: " + response);
                        //     });
                    };
                    // 如果图片过大压缩图片{https://www.imooc.com/article/40038}
                    let maxSize = 100 * 1024; //显示图片最大为100k
                    let imgSize = file.size;  //获取当前图片的大小
                    // if (imgSize > maxSize) {
                    //     let radio = maxSize / imgSize; //设置压缩率
                    //     // file:（可选）压缩的目标图像文件，类型是 File 或者 Blob
                    //     new ImageCompressor(file, {
                    //         quality: radio,        // 输出图像的画质，类型是 number。默认值是 undefined。值是0到1之间的数字。
                    //         convertSize: 1000000,  // 输出图像的文件类型，类型是 number。默认值是 5000000 (5MB)。
                    //         success(newFile) {
                    //             uploadImgMethod(newFile);
                    //         }
                    //     });
                    // } else {
                    //     uploadImgMethod(file);
                    // }
                    uploadImgMethod(file);
                }).then(function(r) {
                    console.log("Done: " + r);
                }).catch(function(reason) {
                    console.log("failed: " + reason);
                });
            }
        }
        //初始化编辑器
        ClassicEditor.create(document.querySelector("#editor")).then(editor => {
            window.editor = editor;
            const content = "请添加图文介绍";
            editor.editing.view.document.on(  //监听事件
                "change:isFocused", (evt, name, value) => {
                    //根据value  true获取焦点 false 失去焦点
                    if (value) {
                        // console.log('我获取了焦点')
                    } else {
                        // console.log('我失去了焦点')
                        // console.log(this)
                        if (this.aaaa === true) {
                            let oP = document.createElement('p');
                            let oBr = document.createElement('br');
                            oBr.setAttribute("data-cke-filler", true);
                            oP.appendChild(oBr)
                            document.querySelector("#editor").appendChild(oP);
                            this.aaaa = false;
                        }
                    }
                }
            );
            // 转化html
            const viewFragment = editor.data.processor.toView(content);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(
                modelFragment,
                editor.model.document.selection
            );
            //初始化上传方法
            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                //在document.querySelector("#editor")的最后插入标签
                // this.aaaa = true;
                return new UploadAdapter(loader);
            };
        })
            .catch(error => {
                console.error(error);
            });
    }
    getData() {
        return window.editor.getData()
    }
    componentWillUnmount() { }
    render() {
        return (
            <div name="content" id= "editor" key="file"> </div>
        );
    }
}
export default RichEditor;