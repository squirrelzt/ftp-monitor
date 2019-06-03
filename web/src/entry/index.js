import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Nav from './../component/nav/nav.js';
import Ftp from './../component/ftp/ftp.js';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root">one</div>';
  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

ReactDOM.render((
  <Router>
    <ul>
      <li>
        <Link to="/nav">nav</Link>
      </li>
      <li>
        <Link to="/ftp">ftp</Link>
      </li>
    </ul>
    <div>
    <Route path="/nav" component = { Nav } />
      <Route path="/ftp" component = { Ftp } />
    </div>
  </Router>
),document.getElementById('root')
);