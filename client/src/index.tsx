import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { useState } from 'react';
import Editor from './components/Editor';
import Connect from './components/Connect'; 
import * as Y from 'yjs'
import { toUint8Array } from 'js-base64';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
