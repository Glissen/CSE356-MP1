import './App.css';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import { useEffect } from 'react'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-view/style/prosemirror.css'

declare global {
  interface Window {
    view?: any;
  }
}

function App() {
  useEffect(() => {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })
    console.log("hello")
    let editor : Element = document.querySelector("#editor");
    let content : Element = document.querySelector("#content");
    if (editor && content) {
      window.view = new EditorView(editor, {
        state: EditorState.create({
          doc: DOMParser.fromSchema(mySchema).parse(content),
          plugins: exampleSetup({schema: mySchema})
        })
      })
    }
  }, [])
  
  
  return (  
    <div className="App">
      Milestone 1
      <div id="editor"></div>
      <div id="content"></div>
    </div>
  );
}

export default App;
