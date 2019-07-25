import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from './../component/nav/nav.js';
import Ftp from './../component/ftp/ftp.js';
import Editor from './../component/editor/editor.js';
import Upload from './../component/editor/upload';
import AsynUpload from './../component/editor/asynupload';
import AntUpload from './../component/editor/antupload';
import RichEditor from './../component/editor/richEditor';
import EditorDemo from './../component/editor/editordemo';
import PureComponentDemo from './../component/useage/PureComponentDemo';
import PicturesWall from './../component/pictureswall/PicturesWall';
import EditorPicturesWall from './../component/editor/EditorPicturesWall';
import './../common/lib.js';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root">one</div>';
  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

ReactDOM.render((
  <Router>
    <div>
      <Route path="/nav" component = { Nav } />
      <Route path="/ftp" component = { Ftp } />
      <Route path="/editor" component = { Editor } />
      <Route path="/upload" component = { Upload } />
      <Route path="/antupload" component = { AntUpload } />
      <Route path="/richEditor" component = { RichEditor } />
      <Route path="/asynupload" component = { AsynUpload } />
      <Route path="/editordemo" component = { EditorDemo } />
      <Route path="/purecomponent" component = { PureComponentDemo } />
      <Route path="/pictureswall" component = { PicturesWall } />
      <Route path="/editorPicturesWall" component = { EditorPicturesWall } />
    </div>
  </Router>
),document.getElementById('root')
);