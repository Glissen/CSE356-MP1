import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import './App.css';
import { useState } from 'react';
import Editor from './components/Editor';
import Connect from './components/Connect'; 
import * as Y from 'yjs'
import { toUint8Array } from 'js-base64';

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

function App() {
  const [connecting, setConnecting] = useState(false);
  const [sessionID, setSessionID] = useState('');
  const [doc, setDoc] = useState(new Y.Doc())

  async function connect(id: any) {
    setConnecting(true);
    const eventSource = new EventSource(`/api/connect/${id}`);
    eventSource.onopen = (e) => setConnecting(false);
    eventSource.addEventListener('sync', (e) => {
      const content = toUint8Array(e.data);
      Y.applyUpdate(doc, content);
    })
    eventSource.addEventListener('update', (e) => {
      const content = toUint8Array(e.data);
      Y.applyUpdate(doc, content);
    })
  }

  return (  
    <div className="App">
      {sessionID ? <Editor id={sessionID} doc={doc}/> : <Connect connect={connect} connecting={connecting}/>} 
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
