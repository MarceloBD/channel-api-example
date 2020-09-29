import dotenv from 'dotenv';
import { connection, server as WebSocketServer } from 'websocket';
import http from 'http';

dotenv.config({  
  path: process.env.NODE_ENV === "PRODUCTION" ? ".env.production" : ".env"
})

const webSocketsServerPort = 3001;
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wsServer = new WebSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients: {[key: string]: connection} = {};

interface Fruit {
  _id: string;
  quantity: number;
  name: string;
}

const fruitList = new Array<Fruit>();


// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()  }-${  s4()}`;
};

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = (json: any) => {
    Object.keys(clients).forEach((client) => {
      clients[client].sendUTF(json);
    });
  }
  

interface ClientDataType {
  type: string;
  content: string;
}

wsServer.on('request', request => {
  const userID = getUniqueID();
  // eslint-disable-next-line no-console
  console.log(`${new Date()  } Recieved a new connection from origin ${  request.origin  }.`);
  const con = request.accept("", request.origin);
  clients[userID] = con;

  // eslint-disable-next-line no-console
  console.log(`connected: ${  userID  } in ${  Object.getOwnPropertyNames(clients)}`)

  con.on('message', message => {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data as string) as ClientDataType;
      const json: {type: string, data?: {fruitList: Fruit[]}} = { type: dataFromClient.type };
      if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        fruitList.push({name: dataFromClient.content, _id:getUniqueID(), quantity: parseInt((Math.random()*100).toString(), 10) });
        json.data = { fruitList };
      }
      sendMessage(JSON.stringify(json));
    }
  });

});
