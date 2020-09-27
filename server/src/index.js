const express = require('express')
const cors = require('cors')
const mongodb = require('mongodb')
const app = express()
const port = 3000
let db = null;

app.use(cors())

const  startMongo = async () => {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology: true
      });
    db = client.db('channel');
}

startMongo();


app.get('/', (req, res) => {
  res.send('api')
})  

app.get('/fruit', async (req, res) => {
    res.send(db ? await db.collection('fruit').find({}).toArray() : [])
})
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
;