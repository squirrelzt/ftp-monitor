import ReactDOM from 'react-dom';
import React from 'react';
import Home from '../component/home.js';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root"></div>';
  return element;
}

// document.body.appendChild(component());

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

ReactDOM.render(
    <Home></Home>,
    document.getElementById('root')
);

