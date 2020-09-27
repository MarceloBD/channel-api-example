const React = require('react');
const ReactDOM = require('react-dom')
const axios = require('axios')

const App = () =>{
const [fruit, setFruit] = React.useState([]);


React.useEffect(()=> {
    axios.get('http://localhost:3000/fruit').then(res => {
        setFruit(res.data)
    }).catch(e => console.log(e));
}, [])


return <div> {fruit.map(e => <div>{e.quantity} {e.name} </div>)} </div>
} 

ReactDOM.render(<App/>, 
    document.getElementById('root'));