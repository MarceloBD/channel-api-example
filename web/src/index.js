const React = require('react');
const ReactDOM = require('react-dom')
const axios = require('axios')
const websocket = require("websocket")

const App = () =>{
  const [fruit, setFruit] = React.useState([]);
  const [event, setEvent] = React.useState({});
  const stateRef = React.useRef();

  stateRef.current = fruit; 

  const client = new websocket.w3cwebsocket('ws://localhost:3001');

  let addInput = null;

  React.useEffect(()=> {
      axios.get('http://localhost:3000/fruit').then(res => {
          setFruit(res.data)
      }).catch(e => console.log(e));
      console.log(stateRef)
      client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          console.log(message)
          const dataFromServer = JSON.parse(message.data);
          setFruit([...stateRef.current, dataFromServer]);
      };

      
      
  }, [])


  const add = () => {
    console.log(addInput.value)
    axios.post('http://localhost:3000/fruit', 
      {name: addInput.value, quantity: parseInt((Math.random()*100).toString(), 10)})
      .then(res => {  
        setFruit(res.data)
      }).catch(e => console.log(e));

   /* client.send(JSON.stringify({
      type: "contentchange",
      username: "marcelo",
      content: addInput.value
    }));
*/
    
  }

 
  

  return (
    <>
      <div> 
        {fruit.map(e => <div key={e._id}>{e.quantity} {e.name} </div>)} 
      </div>
      <input ref={(input) => { addInput = input; }}/>
      <button onClick={() => add()}>Add</button>
    </>
  )} 

ReactDOM.render(<App/>, 
    document.getElementById('root'));