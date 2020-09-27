const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

app.get('/fruit', (req, res) => {
    res.send([{"name": "banana", "quantity": 1}])
  })
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
;