import './App.css';
import { useState } from 'react';
import Editor from './components/Editor';
import Connect from './components/Connect'; 
import * as Y from 'yjs'
import { toUint8Array } from 'js-base64';

function App() {
  const [connecting, setConnecting] = useState(false);
  const [sessionID, setSessionID] = useState('');
  const [doc, setDoc] = useState(new Y.Doc())

  async function connect(id: any) {
    setConnecting(true);
    const eventSource = new EventSource(`http://127.0.0.1:3001/api/connect/${id}`, { withCredentials: true });
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

export default App;
