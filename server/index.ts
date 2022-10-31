import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import * as Y from 'yjs';
import { fromUint8Array, toUint8Array } from 'js-base64';

const PORT: number = 3001;

const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

const ydocs: Array<ydoc> = [];

function connect(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const id = request.params.id

    let ydoc: ydoc = undefined;
    for (let index = 0; index < ydocs.length; index++) {
        const element = ydocs[index];
        if (element.id === id) {
            ydoc = element;
            break;
        }
    }
    if (!ydoc) {
        console.log("Creating doc " + id)
        ydoc = {
            id: id,
            doc: new Y.Doc(),
            clients: []
        };
        ydocs.push(ydoc)
    }

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    ydoc.clients.push(newClient);
    console.log("Connecting client " + clientId + " to doc " + id)

    const data = {
        event: "sync",
        data: fromUint8Array(Y.encodeStateAsUpdate(ydoc.doc))
    };
    // response.write(JSON.stringify(data) + "\n");
    response.write("event: sync\ndata: " + fromUint8Array(Y.encodeStateAsUpdate(ydoc.doc)) + "\n\n")

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        ydocs.forEach((doc) => { doc.clients = doc.clients.filter(client => client.id !== clientId); })
    });
}

async function op(request, respsonse, next) {
    const update = toUint8Array(request.body.update);
    const id: string = request.params.id;
    ydocs.filter((ydoc) => {
        if (ydoc.id === id) {
            console.log("Found doc " + id)
            Y.applyUpdate(ydoc.doc, update)
            ydoc.clients.forEach((client) => {
                // client.response.write(JSON.stringify({ event: "update", data: fromUint8Array(update) }) + "\n");
                client.response.write("event: sync\ndata: " + fromUint8Array(update) + "\n\n");
                console.log("Sending update to client " + client.id)
            });
        }
    });
    respsonse.send("OK");
}

app.get('/api/connect/:id', connect);
app.post('/api/op/:id', op);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})

type ydoc = {
    id: string,
    doc: any,
    clients: Array<any>
}