import './App.css';
import { useState } from 'react';
import Editor from './components/Editor';
import Connect from './components/Connect';

function App() {
  const [session, setSession] = useState('');

  function connect() {
    
  }

  return (  
    <div className="App">
      {session ? <Editor /> : <Connect connect={connect}/>} 
    </div>
  );
}

export default App;
