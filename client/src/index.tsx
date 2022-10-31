import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

class CRDTFormat {
  public bold?: Boolean = false;
  public italic?: Boolean = false;
  public underline?: Boolean = false;
};
exports.CRDT = class {
  // ...

  constructor(cb: (update: string, isLocal: Boolean) => void) {
    // ...
    ['update', 'insert', 'delete', 'toHTML'].forEach(f => (this as any)[f] = (this as any)[f].bind(this));
  }

  update(update: string) {
    // ...
  }

  insert(index: number, content: string, format: CRDTFormat) {
    // ...
  }

  delete(index: number, length: number) {
    // ...
  }

  toHTML() {
    let html = '(fill me in)';
    // ...
    return html;
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
