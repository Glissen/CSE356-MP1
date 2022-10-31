import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
    const [text, setText] = useState("");
    function handleChange(content: any, delta: any, source:any, editor: any) {
        setText(editor.getContents())
    }
    return (
        <ReactQuill 
            id="editor"
            theme="snow" 
            onChange={(content: any, delta: any, source: any, editor: any) => handleChange(content, delta, source, editor)}
        />
    )
}
