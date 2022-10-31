import { useState } from 'react'

export default function Connect(props: {connect: Function}) {
    const [id, setid] = useState('');

    return (
        <form onSubmit={() => props.connect(id)}>
            <div>Document ID: </div>
            <input id='document-id' name='document-id' type='text' value={id} onChange={(e) => setid(e.target.value)}/>
            <button id='connect-btn' type='submit'>Open</button>
        </form>
    )
}